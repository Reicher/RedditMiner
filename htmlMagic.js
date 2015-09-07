createTable = function(array){
  var theTable = document.createElement('table');

  tr = document.createElement('tr');

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Pos"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Substantiv"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Verb"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Adjektiv"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Okänd"));
  tr.appendChild(col);

  theTable.appendChild(tr);

  // Note, don't forget the var keyword!
  for (i in array) {
    tr = document.createElement('tr');

      num = document.createElement('td');
      pos = parseInt(i) + 1;
      num.appendChild(document.createTextNode(pos));
      tr.appendChild(num);

      noun = document.createElement('td');
      noun.appendChild(document.createTextNode(" "));
      tr.appendChild(noun);

      verb = document.createElement('td');
      verb.appendChild(document.createTextNode(" "));
      tr.appendChild(verb);

      adjective = document.createElement('td');
      adjective.appendChild(document.createTextNode(" "));
      tr.appendChild(adjective);

      unknown = document.createElement('td');
      unknown.appendChild(document.createTextNode(array[i].word + " (" + array[i].count + ")"));
      tr.appendChild(unknown);

      theTable.appendChild(tr);
  }

  document.getElementById('table').appendChild(theTable);

}
