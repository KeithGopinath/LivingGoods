/*eslint-disable*/
import React, { Component } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { connect } from 'react-redux';
// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import routes from '../../path';
import livinggoods from '../../../public/static/images/lg_logo_white.png'
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import PopUp from '../PopUp';

var ps;

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.getCollapseStates(routes),
      openAvatar: false,
      isWindows: navigator.platform.indexOf("Win") > -1 ? true : false,
      width: window.innerWidth,
      user: '',
      showPopUp: false,
    };
  }
  // this creates the intial state of this component based on the collapse routes
  // that it gets through this.props.routes
  getCollapseStates = routes => {
    let initialState = {};
    routes.map((prop, key) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: this.getCollapseInitialState(prop.views),
          ...this.getCollapseStates(prop.views),
          ...initialState
        };
      }
      return null;
    });
    return initialState;
  };

  // this verifies if any of the collapses should be default opened on a rerender of this component
  // for example, on the refresh of the page,
  // while on the src/views/forms/RegularForms.jsx - route /admin/regular-forms
  getCollapseInitialState(routes) {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && this.getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  }

  // this function creates the links and collapses that appear in the sidebar (left menu)
  createLinks = (routes, role) => {
    return routes.filter(data => role == 'ADMIN' ? data.path !== '/popup' : data).map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !this.state[prop.state];
        return (
          <li
            className={this.getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#"
              onClick={e => {
                e.preventDefault();
                this.setState(st);
              }}
            >
              <i className={prop.icon} />
              <p>
                {prop.name}
                <b
                  className={
                    this.state[prop.state] ? "caret rotate-180" : "caret"
                  }
                />
              </p>
            </a>
            <Collapse in={this.state[prop.state]}>
              <ul className="nav">{this.createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={this.activeRoute(prop.layout + prop.path)} key={key} onClick={() => { this.handleActive(prop.path) }} >
          <NavLink
            to={prop.path == '/popup' ? this.props.history.location.pathname : prop.path}
            className="nav-link"
            activeClassName="active"
          >
            {prop.icon ? (
              <div>
                <i className={prop.icon} />
                <p>{prop.name}</p>
              </div>
            ) : (
              <div>
                <span className="sidebar-mini">{prop.mini}</span>
                <span className="sidebar-normal">{prop.name}</span>
              </div>
            )}
          </NavLink>
        </li>
      );
    });
  };

  handleActive = (path) => {
    if (path == '/popup') {
      this.setState({ showPopUp: true })
    }
  }

  hidePopup = () => {
    this.setState({ showPopUp: false })
  }

  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.history.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };

  // if the windows width changes CSS has to make some changes
  // this functions tell react what width is the window
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }

  componentDidUpdate() {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
  }

  componentDidMount() {
    this.updateDimensions();
    // add event listener for windows resize
    window.addEventListener("resize", this.updateDimensions.bind(this));
    // if you are using a Windows Machine, the scrollbars will have a Mac look
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebarWrapper, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
    if (!this.props.login) {
      this.setState({ user: sessionStorage.username })
    }
  }

  componentWillUnmount() {
    // we need to destroy the false scrollbar when we navigate
    // to a page that doesn't have this component rendered
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }

  render() {
    const { username, roleName } = this.props.login
    const { user } = this.state
    const loginUser = username || user
    const role = roleName || sessionStorage.rolename

    return (
      <div
        className="sidebar"
        data-color={this.props.color}
        data-image={this.props.image}
      >
        {this.props.hasImage ? (
          <div
            className="sidebar-background"
            style={{ backgroundImage: "url(" + this.props.image + ")" }}
          />
        ) : (
          ""
        )}
        <div className="logo text-center">
          <img src={livinggoods} className='mb-5' style={{ 'width': '100%', 'maxWidth': '170px' }} />
        </div>
        <PopUp showPopup={this.state.showPopUp} hidePopup={this.hidePopup} title="Build Version" icon={faWrench} labelOne="Version" labelTwo="Url" button="Send" />
        <div className="sidebar-wrapper" ref="sidebarWrapper">
          <div className="user">
            <div className="photo" style={{ marginTop: '10px' }}>
              <p>{loginUser.charAt(0).toUpperCase()}</p>
            </div>
            <div className="info">
              <p>{loginUser}</p>
              <p>{role}</p>
            </div>
          </div>
          <ul className="nav">
            {this.createLinks(routes, role)}
          </ul>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  login: '',
};

const mapStateToProps = (state, ownProps) => ({
  login: state.loginState.login
});

export default connect(mapStateToProps)(Sidebar);
