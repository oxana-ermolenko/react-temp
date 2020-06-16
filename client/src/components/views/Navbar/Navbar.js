import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Drawer, Button} from 'antd';
import Icon from '@ant-design/icons';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';

function Navbar() {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  };
  const onClose = () => {
    setVisible(false)
  }
  return(
    <nav 
      className = 'menu'
      style = {{
        position: 'fixed',
        zIndex: 1,
        width: '100%'
      }}>

      <div className = 'menu_logo'>
        <Link to = '/'>Logo</Link>
      </div>
      <div className = 'menu_container'>
        <div className = 'menu_left'>
          <LeftMenu mode = 'horizontal' />
        </div>
        <div className = 'menu_right'>
          <RightMenu mode = 'horizontal' />
        </div>
        <Button
          className = 'menu_mobi;e-button'
          type = 'primary'
          onClick = {showDrawer}
        >
          <Icon type = 'align-right' />
        </Button>
        <Drawer
          title = 'Basic Drawer'
          placement = 'right'
          className = 'menu_drawer'
          closable = {false}
          onClose = {onClose}
          visible = {visible}
        >
          <LeftMenu mode = 'inline' />
          <RightMenu mode = 'inline' />
        </Drawer>
      </div>
    </nav>
  )
}

export default Navbar;