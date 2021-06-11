import React from 'react';
import { connect } from 'react-redux';
import { Button, TextField }  from '@material-ui/core';
import axios from 'axios';
import { ACTIONS, QUERY_ENDPOINT, COMMON_GREMLIN_ERROR } from '../../constants';
import { onFetchQuery } from '../../logics/actionHelper';

class Header extends React.Component {
  clearGraph() {
    this.props.dispatch({ type: ACTIONS.CLEAR_GRAPH });
    this.props.dispatch({ type: ACTIONS.CLEAR_QUERY_HISTORY });
  }

  sendQuery() {
    this.props.dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    axios.post(
      QUERY_ENDPOINT,
      { host: this.props.host, port: this.props.port,
        user: this.props.user, password: this.props.password,
        traversal: this.props.traversal,
        query: this.props.query, nodeLimit: this.props.nodeLimit },
      { headers: { 'Content-Type': 'application/json' } }
    ).then((response) => {
      onFetchQuery(response, this.props.query, this.props.nodeLabels, this.props.dispatch);
    }).catch((error) => {
      this.props.dispatch({ type: ACTIONS.SET_ERROR, payload: COMMON_GREMLIN_ERROR });
    });
  }

  onHostChanged(host) {
    this.props.dispatch({ type: ACTIONS.SET_HOST, payload: host });
  }

  onPortChanged(port) {
    this.props.dispatch({ type: ACTIONS.SET_PORT, payload: port });
  }

  onUserChanged(user) {
    this.props.dispatch({ type: ACTIONS.SET_USER, payload: user });
  }

  onPasswordChanged(password) {
    this.props.dispatch({ type: ACTIONS.SET_PASSWORD, payload: password });
  }

  onTraversalChanged(traversal) {
    this.props.dispatch({ type: ACTIONS.SET_TRAVERSAL, payload: traversal });
  }

  onQueryChanged(query) {
    this.props.dispatch({ type: ACTIONS.SET_QUERY, payload: query });
  }

  render(){
    return (
      <div className={'header'}>
        <form noValidate autoComplete="off">
          <TextField value={this.props.host} onChange={(event => this.onHostChanged(event.target.value))} id="standard-basic" label="host" style={{width: '10%'}} />
          <TextField value={this.props.port} onChange={(event => this.onPortChanged(event.target.value))} id="standard-basic" label="port" style={{width: '10%'}} />
          <TextField value={this.props.user} onChange={(event => this.onUserChanged(event.target.value))} id="standard-basic" label="user" style={{width: '10%'}} />
          <TextField value={this.props.password} onChange={(event => this.onPasswordChanged(event.target.value))} id="standard-basic" label="password" type="password" style={{width: '10%'}} />
          <Button variant="contained" color="primary" onClick={this.sendQuery.bind(this)} style={{width: '150px'}} >Execute</Button>
          <Button variant="outlined" color="secondary" onClick={this.clearGraph.bind(this)} style={{width: '150px'}} >Clear Graph</Button>
          <br />
          <TextField value={this.props.traversal} onChange={(event => this.onTraversalChanged(event.target.value))} id="standard-basic" label="gremlin traversal" style={{width: '30%'}} />
          <br />
          <TextField value={this.props.query} onChange={(event => this.onQueryChanged(event.target.value))} id="standard-multiline-static" label="gremlin query" multiline rows={4} style={{width: '60%'}} />
        </form>

        <br />
        <div style={{color: 'red'}}>{this.props.error}</div>
      </div>

    );
  }
}

export const HeaderComponent = connect((state)=>{
  return {
    host: state.gremlin.host,
    port: state.gremlin.port,
    user: state.gremlin.user,
    password: state.gremlin.password,
    traversal: state.gremlin.traversal,
    query: state.gremlin.query,
    error: state.gremlin.error,
    nodes: state.graph.nodes,
    edges: state.graph.edges,
    nodeLabels: state.options.nodeLabels,
    nodeLimit: state.options.nodeLimit
  };
})(Header);