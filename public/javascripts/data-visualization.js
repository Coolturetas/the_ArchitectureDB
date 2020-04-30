function printDonutChart(
  data,
  colorScale,
  colorRangeInfo,
  field,
  canvas,
  isPopulated
) {
  const fields = data.map((object) => object[field])
  let unduplicatedEntries = []
  let unduplicatedEntriesPop = []
  let workCount = {}

  fields.forEach((elm) => {
    if (unduplicatedEntries.indexOf(elm) == -1) {
      unduplicatedEntries.push(elm)
      workCount[elm] = 1
    } else {
      workCount[elm]++
    }
  })

  if (isPopulated) {
    unduplicatedEntries.forEach((elm) => {
      switch (field) {
        case 'architect':
          axios
            .get(`/api/architects/${elm}`)
            .then((result) => {
              unduplicatedEntriesPop.push(result.data.arch.name)
            })
            .catch((err) => {
              next(new Error(err))
            })
          break
        case 'trend':
          axios
            .get(`/api/trend/${elm}`)
            .then((result) => {
              unduplicatedEntriesPop.push(result.data.trend.name)
            })
            .catch((err) => {
              next(new Error(err))
            })
          break
      }
    })
    console.log('Before: ', unduplicatedEntries)
    unduplicatedEntries = unduplicatedEntriesPop
    console.log('After: ', unduplicatedEntries)
  }

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
      labels: unduplicatedEntries,
    },
    options: { legend: { position: 'top' } },
  })
}

axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
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

axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
    printDonutChart(
      data,
      d3.interpolatePuRd,
      [0, 1],
      'architect',
      'works-per-architect',
      true
    )
  })
  .catch((err) => {
    console.log(err)
  })

  axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
    printDonutChart(
      data,
      d3.interpolatePuRd,
      [0, 1],
      'trend',
      'works-per-trend',
      true
    )
  })
  .catch((err) => {
    console.log(err)
  })