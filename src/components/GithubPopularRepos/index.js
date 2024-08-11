import Loader from 'react-loader-spinner'
import {Component} from 'react'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    activeId: languageFiltersData[0].id,
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryList()
  }

  getRepositoryList = async () => {
    this.setState({
      apiStatus: apiConstants.progress,
    })
    const {repositoryList, activeId} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`

    const response = await fetch(url)
    const data = await response.json()
    const popularRepos = data.popular_repos
    if (response.ok === true) {
      const updateData = popularRepos.map(each => ({
        id: each.id,
        avatarUrl: each.avatar_url,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
        name: each.name,
        starsCount: each.stars_count,
      }))
      this.setState({
        repositoryList: updateData,
        apiStatus: apiConstants.success,
      })
    } else if (response.ok === false) {
      this.setState({
        apiStatus: apiConstants.failure,
      })
    }
  }

  updateActiveLanguageId = activeId => {
    this.setState(
      {
        activeId,
      },
      this.getRepositoryList,
    )
  }

  renderFilterItemLanguage = () => {
    const {activeId, repositoryList} = this.state
    return (
      <div>
        <ul className="filterItem-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              filterItem={each}
              key={each.id}
              updateActiveLanguageId={this.updateActiveLanguageId}
              isActive={activeId === each.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderRepositoryList = () => {
    const {activeId, repositoryList} = this.state
    return (
      <div>
        <ul className="repositoryList-container">
          {repositoryList.map(each => (
            <RepositoryItem repositoryDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderfailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositoryListBySwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.progress:
        return (
          <div data-testid="loader" className="loader-container">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )
      case apiConstants.success:
        return this.renderRepositoryList()
      case apiConstants.failure:
        return this.renderfailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <h1 className="main-heading">Popular </h1>
        {this.renderFilterItemLanguage()}
        {this.renderRepositoryListBySwitch()}
      </div>
    )
  }
}

export default GithubPopularRepos
