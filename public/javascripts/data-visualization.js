function printDonutChart(data, colorScale, colorRangeInfo, field, canvas) {
  const fields = data.map((object) => object[field])
  let unduplicatedEntries = []
  let workCount = {}

  fields.forEach((elm) => {
    if (unduplicatedEntries.indexOf(elm) == -1) {
      unduplicatedEntries.push(elm)
      workCount[elm] = 1
    } else {
      workCount[elm]++
    }
  })

  const datasetEntries = Object.keys(workCount)
  const worksPerEntry = datasetEntries.map((field) => workCount[field])

  const ctx = document.getElementById(canvas).getContext('2d')

  const colors = interpolateColors(
    worksPerEntry.length,
    colorScale,
    colorRangeInfo
  )

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{ backgroundColor: colors, data: worksPerEntry }],
      labels: datasetEntries,
    },
  })
}

axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
    console.log(data)
    printDonutChart(
      data,
      d3.interpolatePuRd,
      [0, 1],
      'country',
      'works-per-country'
    )
  })
  .catch((err) => {
    console.log(err)
  })

  axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
    console.log(data)
    printDonutChart(
      data,
      d3.interpolatePuRd,
      [0, 1],
      'workType',
      'works-per-type'
    )
  })
  .catch((err) => {
    console.log(err)
  })