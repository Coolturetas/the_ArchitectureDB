function calculatePoint(i, intervalSize, colorRangeInfo) {
  const colorStart = colorRangeInfo[0]
  const colorEnd = colorRangeInfo[1]
  const useEndAsStart = true
  return (useEndAsStart
    ? (colorEnd - (i * intervalSize))
    : (colorStart + (i * intervalSize)));
}

function interpolateColors(dataLength, colorScale, colorRangeInfo) {
  const colorStart = colorRangeInfo[0]
  const colorEnd = colorRangeInfo[1]
  const colorRange = colorEnd - colorStart;
  const intervalSize = colorRange / dataLength;
  let i, colorPoint;
  let colorArray = [];

  for (i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}  