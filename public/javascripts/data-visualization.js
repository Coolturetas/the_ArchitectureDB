function printWorksPerCountry(data, colorScale, colorRangeInfo) {
  const countries = data.map((object) => object.country)
  let unduplicatedCountries = []
  let workCount = {}

  countries.forEach((elm) => {
    if (unduplicatedCountries.indexOf(elm) == -1) {
      unduplicatedCountries.push(elm)
      workCount[elm] = 1
    } else {
      workCount[elm]++
    }
  })

  const datasetCountries = Object.keys(workCount)
  const worksPerCountry = datasetCountries.map((country) => workCount[country])

  const ctx = document.getElementById('works-per-country').getContext('2d')

  const colors = interpolateColors(
    worksPerCountry.length,
    colorScale,
    colorRangeInfo
  )

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{ backgroundColor: colors, data: worksPerCountry }],
      labels: datasetCountries,
    },
  })
}

axios
  .get('/api/works')
  .then((works) => {
    data = works.data.allWorks
    printWorksPerCountry(data, d3.interpolatePuRd, [0, 1])
  })
  .catch((err) => {
    console.log(err)
  })
