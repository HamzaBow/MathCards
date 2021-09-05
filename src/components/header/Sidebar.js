import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {List as ListIcon, Save, Star, Feedback, Help} from '@material-ui/icons/';
import { AiFillHeart } from 'react-icons/ai'
import { ImSigma } from "react-icons/im";
import { logoStyle, sigmaContainerStyle, SigmaIconStyle, headingStyle, iconStyle } from './Header';

export default function Sidebar({ displaySidebar, setDisplaySidebar }) {

  return (
      <div>
          <Drawer anchor="left" open={displaySidebar} onClose={() => setDisplaySidebar(prev => !prev)} >
            <List>


                <ListItem button key='Inbox' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <div style={logoStyle}>

                        <ArrowBack style={{ ...iconStyle, margin: "0 0.8rem 0 0", padding: "0", width: '2rem', height: '2rem' }} />

                        <span style={sigmaContainerStyle}>
                            <ImSigma style={SigmaIconStyle} />
                        </span>
                        <h1 style={{...headingStyle, marginRight: '1.5rem'}} >MathCards</h1>
                    </div>
                </ListItem>

            <Divider />

                <ListItem button key='Saved Cards' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <Save />
                    </ListItemIcon>
                    <ListItemText primary='Saved Cards' />
                </ListItem>

                <ListItem button key='Starred' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <Star />
                    </ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>

                <ListItem button key='Liked' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <AiFillHeart size={25} />
                    </ListItemIcon>
                    <ListItemText primary='Liked' />
                </ListItem>

                <ListItem button key='My Collections' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary='My Collections' />
                </ListItem>
            </List>

            <Divider />

            <List>
                <ListItem button key='All mail' onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <Help />
                    </ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItem>

                <ListItem button key="Feedback" onClick={() => setDisplaySidebar(prev => !prev)}>
                    <ListItemIcon>
                        <Feedback />
                    </ListItemIcon>
                    <ListItemText primary="Feedback" />
                </ListItem>
            </List>
          </Drawer>
      </div>
  );
}
