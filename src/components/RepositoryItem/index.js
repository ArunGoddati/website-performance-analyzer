import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails, key} = props
  const {
    id,
    avatarUrl,
    forksCount,
    issuesCount,
    name,
    starsCount,
  } = repositoryDetails
  return (
    <li className="repository-item">
      <img src={avatarUrl} className="repository-image" alt={name} />
      <h1 className="repository-name">{name}</h1>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="stars-image"
        />
        <p className="stars-count-text">{starsCount} stars</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars-image"
        />
        <p className="stars-count-text">{forksCount} forks</p>
      </div>
      <div className="stars-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars-image"
        />
        <p className="stars-count-text">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
