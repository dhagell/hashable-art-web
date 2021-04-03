import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { ASSET_URL, CHOSEN_THEME } from './constants'
import logo from './static/images/logo.png';
import './static/styles/App.css';
import footer from './static/images/footer.png';
import { iframeResizer } from 'iframe-resizer'
//import IframeResizer from 'iframe-resizer-react'
import './static/styles/App.css';


//import * as Web3 from 'web3'
//import { OpenSeaPort, Network } from 'opensea-js'

let ethereum = window.ethereum;
const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';
const embeddedUrl = `${ASSET_URL}?embed=${CHOSEN_THEME}`

declare global {
    interface Window {
        ethereum:any;
    }
}
class App extends React.Component {

  componentDidMount() {
    iframeResizer({ log: true, scrolling: true }, '#opensea-iframe')
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p><p></p>
		  <OnboardingButton></OnboardingButton>
          <i className="material-icons right">menu</i>
		  
        </header>
        <main className="App-main">
          <div className="App-hero">
            <div className="App-hero-image"></div>
            <p>
              Hashable.Art Marketplace
            </p>
            <small>Digital collectibles from Hashable.Art</small>
					  

          </div>
          <iframe id="opensea-iframe" title="Hashable.Art Marketplace"  src={embeddedUrl} scrolling="yes" style={{ height: '1028px', minHeight: '100%'}} width='100%' height='1028px' frameBorder='0' allowFullScreen></iframe>
		  
        </main>
        <footer className="App-footer">
          {/* Placeholder image for footer */}
          <img style={{width: '100%'}} src={footer} className="footer" alt="footer" />
        </footer>
      </div>
    );
  }
}
export function OnboardingButton() {
  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);
  const [accounts, setAccounts] = React.useState([]);
  const onboarding = React.useRef<MetaMaskOnboarding>();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        //onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [accounts]);

  React.useEffect(() => {
    function handleNewAccounts(newAccounts) {
      setAccounts(newAccounts);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(handleNewAccounts);
      window.ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        window.ethereum.off('accountsChanged', handleNewAccounts);
      };
    }
  }, []);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((newAccounts) => setAccounts(newAccounts));
    } else {
      onboarding.current.startOnboarding();
    }
  };
  return (
    <button className="float-right" disabled={isDisabled} onClick={onClick}>
      {buttonText}
    </button>
  );
}
export default App;
