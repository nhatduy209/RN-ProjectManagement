import React from 'react';
const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignin: false,
    };
  }
  setSignin = () => {
    this.setState({
      isSignin: !this.state.isSignin,
    });
  };
  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setSignin: this.setSignin
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = (ChildComponent) => (props) => (
  <GlobalContext.Consumer>
    {(context) => <ChildComponent {...props} global={context} />}
  </GlobalContext.Consumer>
);
