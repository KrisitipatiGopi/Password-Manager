import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

class Passwords extends Component {
  state = {
    webistename: '',
    username: '',
    password: '',
    PasswordsList: [],
    SearchInput: '',
    isShow: false,
  }

  componentDidMount() {
    // Load passwords from localStorage on component mount
    const storedPasswords = localStorage.getItem('passwords');
    if (storedPasswords) {
      this.setState({ PasswordsList: JSON.parse(storedPasswords) });
    }
  }

  componentDidUpdate() {
    // Save passwords to localStorage on component update
    localStorage.setItem('passwords', JSON.stringify(this.state.PasswordsList));
  }


  onChangeWebsite = event => {
    this.setState({webistename: event.target.value})
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({SearchInput: event.target.value})
  }

  onAddNewPasswords = event => {
    event.preventDefault()
    const {username, password, webistename} = this.state
    if (!webistename.trim() || !username.trim() || !password.trim()) {
        alert('All fields are required'); // You can replace this with a more user-friendly notification
  
        // Return early to prevent adding empty passwords to the list
        return;
      }
    const newPasswordsList = {
      id: uuidv4(),
      userName: username,
      Password: password,
      Webistename: webistename,
    }
    this.setState(prevState => ({
      PasswordsList: [...prevState.PasswordsList, newPasswordsList],
      username: '',
      password: '',
      webistename: '',
    }))
  }

  onDeletePassword = id => {
    // Filter out the password with the given id and update the state
    this.setState(prevState => ({
      PasswordsList: prevState.PasswordsList.filter(
        password => password.id !== id,
      ),
    }))
  }

  render() {
    const {
      username,
      password,
      webistename,
      PasswordsList,
      SearchInput,
      isShow,
    } = this.state

    const newList = PasswordsList.filter(each =>
      each.Webistename.toLowerCase().includes(SearchInput.toLowerCase()),
    )

    console.log(newList)

    return (
      <div className="mainContainer">
        <div className="contentContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="image"
          />
          <div className="topContainer">
            <form
              className="leftContainer"
              onSubmit={this.onAddNewPasswords}
              autoComplete="off"
            >
              <div className="formContainer">
                <h1 className="heading">Add New Passwords</h1>
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="inputFields"
                  value={webistename}
                  onChange={this.onChangeWebsite}
                />
                <input
                  type="text"
                  placeholder="Username"
                  className="inputFields"
                  value={username}
                  onChange={this.onChangeUserName}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="inputFields"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <div className="buttonContainer">
                <button type="submit" className="button">
                  Add
                </button>
              </div>
            </form>
            <div className="rightContainer">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
                alt="password manager"
                className="mainImage"
              />
            </div>
          </div>
          <div className="bottomContainer">
            <div className="innerContainer">
              <div className="bottomTopContainer">
                <p className="para">
                  Your Passwords : <b>{PasswordsList.length}</b>
                </p>
                <input
                  type="search"
                  className="inputBox"
                  placeholder="Search For Your Passwords"
                  onChange={this.onChangeSearch}
                  value={SearchInput}
                />
              </div>
              <hr className="line" />
              <div className="checkBoxContainer">
                <p className="para">Show Passwords </p>
                <input
                  type="checkbox"
                  className="check"
                  checked={isShow}
                  onChange={() =>
                    this.setState(prevState => ({isShow: !prevState.isShow}))
                  }
                />
              </div>
              {newList.length === 0 ? (
                <div className="imageContainer">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                    alt="no passwords"
                    className="mainImage"
                  />
                </div>
              ) : (
                <div className="PasswordsContainer">
                  {newList.map(each => (
                    <div className="inside">
                      <div className="row">
                        <p className="no">{each.Webistename}</p>
                        <p className="no">{each.userName}</p>
                        {isShow ? <p>{each.Password}</p> : <p>***********</p>}
                      </div>
                      <div className="delete">
                        <button
                          type="button"
                          className="delt"
                          onClick={() => this.onDeletePassword(each.id)}
                        >
                          <img
                            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                            alt="delete"
                            className="deleteButton"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Passwords
