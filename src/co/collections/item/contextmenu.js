import React from 'react'
import t from '~t'
import Popover, { Menu, MenuItem, MenuSeparator } from '~co/popover'
import Icon from '~co/common/icon'

export default function CollectionsItemContextmenu({
    _id, access, to,
    onContextMenuClose, onCreateNewChildClick, onRenameClick, onRemoveClick
}) {
    return (
        <Popover onClose={onContextMenuClose}>
            <Menu>
                <MenuItem href={`https://app.raindrop.io/#${to}`} target='_blank'>
                    <Icon name='open' />
                    {t.s('openInBrowser')}
                </MenuItem>

                {/* Have write access */}
                { _id>0 ? (access.level>=3 ? (
                    <>
                        <MenuItem onClick={onCreateNewChildClick}>
                            <Icon name='new_collection' />
                            {t.s('createSubFolder')}
                        </MenuItem>

                        <MenuSeparator />

                        <MenuItem onClick={onRenameClick}>
                            <Icon name='new_note' />
                            {t.s('edit')}
                        </MenuItem>

                        <MenuItem onClick={onRemoveClick}>
                            <Icon name='trash' />
                            {t.s('remove')}
                        </MenuItem>
                    </>
                ) :
                //Just a viewer
                (
                    <MenuItem onClick={onRemoveClick}>
                        <Icon name='exit' />
                        {t.s('leave')}
                    </MenuItem>
                )) : null}

                { _id==-99 && (
                    <MenuItem onClick={onRemoveClick}>
                        <Icon name='trash' />
                        {t.s('removeIt')} {t.s('all').toLowerCase()} {t.s('in')} {t.s('defaultCollection--99').toLowerCase()}
                    </MenuItem>
                ) }
            </Menu>
        </Popover>
    )
}