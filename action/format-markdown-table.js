var isSeparator = /^(:?)(-+)(:?)$/;

function trimCell(text) {
  text = text.trim();
  var separator = text.match(isSeparator);
  if (separator) {
    text = separator[1] + "-" + separator[3];
  }
  return text;
}

function pad(text, length) {
  var separator = text.match(isSeparator);
  if (separator) {
    text = separator[2];
    while ((separator[1] + text + separator[3]).length < length + 2) {
      text += "-";
    }
    return separator[1] + text + separator[3];
  } else {
    while (text.length < length) {
      text += " ";
    }
    return " " + text + " ";
  }
}

function parseToTable(text) {
  var table = text
    .split("\n")
    .map(function (line) {
      return line
        .split("|")
        .map(trimCell);
    });
  var maxTextLengthPerColumn = [];
  for (var i = 0; i < table[0].length; i++) {
    var max = table
      .map(function (row) { return row[i].length; })
      .reduce(function (prev, curr) { return prev > curr ? prev : curr; }, 0);
    maxTextLengthPerColumn.push(max);
  }

  return table.map(function (row) {
    return row.map(function (col, i) {
      return pad(col, maxTextLengthPerColumn[i]);
    })
  });
}

function formatToString(table) {
  return table
    .map(function (row) { return row.join("|").trim(); })
    .join("\n");
}

var table = parseToTable(clipText);
var formattedText = formatToString(table);

return formattedText;


