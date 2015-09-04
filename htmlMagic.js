createTable = function(array){
  var theTable = document.createElement('table');

  tr = document.createElement('tr');

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Pos"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Ord"));
  tr.appendChild(col);

  col = document.createElement('th');
  col.appendChild(document.createTextNode("Antal"));
  tr.appendChild(col);

  theTable.appendChild(tr);

  // Note, don't forget the var keyword!
  for (i in array) {
    tr = document.createElement('tr');

      num = document.createElement('td');
      pos = parseInt(i) + 1;
      num.appendChild(document.createTextNode(pos));
      tr.appendChild(num);

      // För att ta bort massa jobbiga ord
      /*word = document.createElement('td');
      word.appendChild(document.createTextNode('"' + array[i].word + '",'));
      tr.appendChild(word);*/

      word = document.createElement('td');
      word.appendChild(document.createTextNode(array[i].word));
      tr.appendChild(word);

      count = document.createElement('td');
      count.appendChild(document.createTextNode(array[i].count));
      tr.appendChild(count);

      theTable.appendChild(tr);
  }

  document.getElementById('table').appendChild(theTable);

}
