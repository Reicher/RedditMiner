runRedditSniffer = function(subreddit) {
  $('#table').empty();
  posts = [];
  totalPosts = 0;
  commentsLoaded = 0;
  adress = "https://www.reddit.com/r/" + subreddit;

  $.getJSON(adress + ".json?", null, processTitles);
}

processTitles = function(data) {
  titles = data.data.children;
  totalPosts = titles.length;

  for (p in titles) {
    posts.push(titles[p].data.title);

    if(titles[p].data.is_self)
      posts.push(titles[p].data.selftext);

    $.getJSON(adress + "/comments/" + titles[p].data.id + ".json?", null, processComment);
  }
}

cutTree = function(postComments, list) {
  for (p in postComments) {
    elem = postComments[p].data;
    list.push(elem.body);
    if (elem.replies != "" && elem.replies != null)
      cutTree(elem.replies.data.children, list);
  }
}

processComment = function(data) {
  title = data[0].data.children[0].data.title;
  comments = [];
  cutTree(data[1].data.children, comments);

  for (c in comments) {
    posts.push(comments[c]);
  }

  commentsLoaded++;

  if (commentsLoaded == totalPosts)
    extractWords();
}
countThem = function(array) {
  counted = [];
  for (x in array) {
    var result = $.grep(counted, function(e) {
      return e.word == array[x];
    });
    if (result == 0)
      counted.push({
        'word': array[x],
        'count': 1
      });
    else
      result[0].count += 1;
  }
  return counted;
};

removeCommon = function(array){
  return $.grep(array, function(v) {
      return BigNoNo.indexOf(v.word) == -1 && v.word != "";
    });
}

extractWords = function() {
  console.log("Total comments and titles: " + posts.length);

  words = [];
  for (w in posts) {
    sentence = posts[w];
    if (sentence != null)
      words = words.concat(sentence.toLowerCase().replace(/[^a-ö ]/g, "").split(/[ ,]+/));

  }
  console.log("Total words: " + words.length);

  document.getElementById("stats").innerHTML = "Totalt antal titlar och kommentarer: "
  + posts.length + "<br>Totalt antal ord: " + words.length;

  occurrences = countThem(words);

  filter = document.getElementById('Filter');
  if(commonFilter.checked)
    occurrences = removeCommon(occurrences);

  occurrences = occurrences.sort(function(a, b){return b.count-a.count});

  /*for (i = 0; i < 100; i++)
    console.log((i+1) + ". " + occurrences[i].word + " (" + occurrences[i].count + ")");*/

    createTable(occurrences.slice(0, 100));
}
