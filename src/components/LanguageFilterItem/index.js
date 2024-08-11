import './index.css'

const LanguageFilterItem = props => {
  const {filterItem, key, updateActiveLanguageId, isActive} = props
  const {id, language} = filterItem
  const activeLanguage = isActive ? 'active-className' : ''
  const activeButton = isActive ? 'active-button' : ''
  const clickOnLanguage = () => {
    updateActiveLanguageId(id)
  }

  return (
    <li className={`filter-item ${activeLanguage}`} onClick={clickOnLanguage}>
      <button className="filter-item-button">
        <p className={`language-text ${activeButton}`}>{language}</p>
      </button>
    </li>
  )
}

export default LanguageFilterItem
