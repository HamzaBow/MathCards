import { ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from '@material-ui/core'
import React from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useUser } from '../../contexts/UserContext';
import { Collection } from 'contexts/UserContext'
import { fetchAddCardToCollection } from 'api/collectionAPI';

// ***********************************************************************************************************************
// ***********************************************************************************************************************

interface CollectionItemProps {
  collectionId: string;
  cardId: string;
  title: string;
  setSaveToPromptOpen: Function;
}

const CollectionItem: React.FC<CollectionItemProps> = ({ collectionId, cardId, title, setSaveToPromptOpen }) => {
  const handleSaveCardToCollection = (event: any) => {
    fetchAddCardToCollection(collectionId, cardId )
    setSaveToPromptOpen(false)
  }
  return (
  <MenuItem onClick={handleSaveCardToCollection}>
    <BiEditAlt style={{ marginRight: '0.7rem' }} />
      {title}
  </MenuItem>
  )
}

// ***********************************************************************************************************************
// ***********************************************************************************************************************

interface Props {
  cardId: string;
  saveToPromptOpen: boolean;
  setSaveToPromptOpen: Function;
  saveRef: any;
}

const SaveToPrompt: React.FC<Props> = ({cardId, saveToPromptOpen, setSaveToPromptOpen, saveRef}) => {

  const user = useUser();

  // const handleClose = (event: React.MouseEvent<Document, MouseEvent>): void => {
  // const handleClose = (event: MouseEventHandler<HTMLLIElement>) => {
  const handleClose = (event: any) => {

    if (saveRef && saveRef.contains(event.target)) {
      return;
    }
    setSaveToPromptOpen(false);
  }

  return (
      <Popper open={saveToPromptOpen}  anchorEl={saveRef} role={undefined} placement="right" transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={saveToPromptOpen} id="menu-list-grow" > {/* onKeyDown={handleListKeyDown}> */}
                  {/* @ts-ignore  */}
                  {user.collections.map((collection: Collection) => (
                    <CollectionItem key={collection._id} collectionId={collection._id} cardId={cardId} title={collection.title} setSaveToPromptOpen={setSaveToPromptOpen}  />
                  ))}
                </MenuList>


              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
  )
}

export default SaveToPrompt
