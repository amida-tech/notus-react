import React from 'react'

function SavedQueries() {
  const Queries = [
    { name: 'Yearly Comparison' },
    { name: 'Composite Report' },
    { name: 'Current Snapshot Report' },
    { name: '60 Day Camparison' }]
  function showlist() {
    const indiQueries = Queries.map((query) => (
      <li className="saved-queries__past-search-item">
        <a href="#/">
          {query.name}
        </a>
      </li>
    ))
    return (
      <ul className="saved-queries__past-search">
        {indiQueries}
      </ul>
    )
  }
  return (
    <div className="saved-queries">
      <h2 className="saved-queries__h2-header">Saved Queries</h2>
      <p className="saved-queries__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      {showlist() }
    </div>

  )
}

export default SavedQueries
