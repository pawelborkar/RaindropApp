import s from './suggested.module.styl'
import React, { useMemo, useEffect, useCallback } from 'react'
import t from '~t'
import { useSelector, useDispatch } from 'react-redux'
import { suggestFields } from '~data/actions/bookmarks'
import { makeSuggestedFields } from '~data/selectors/bookmarks'
import { makeCollection } from '~data/selectors/collections'

import Button from '~co/common/button'
import CollectionIcon from '~co/collections/item/icon'

function SuggestedCollectionLabel({ id }) {
    const getCollection = useMemo(()=>makeCollection(), [])
    const collection = useSelector(state=>getCollection(state, id))

    return (<>
        <CollectionIcon {...collection} />
        <span>{collection.title}</span>
    </>)
}

export default function BookmarkEditFormCollectionSuggested({ item, events: { onItemClick } }) {
    const dispatch = useDispatch()

    //get suggestions
    const getSuggestedFields = useMemo(()=>makeSuggestedFields(), [])
    const fields = useSelector(state=>getSuggestedFields(state, item.link))
    const { last_collection } = useSelector(state=>state.config)

    //combine suggestions with last used
    const collections = useMemo(()=>[
        ...(last_collection == item.collectionId || fields.collections.includes(last_collection) ? [] : [last_collection]), 
        ...fields.collections
    ], [fields.collections, last_collection, item.collectionId])

    //load suggestions
    useEffect(()=>dispatch(suggestFields(item)), [item.link])

    //click
    const onSuggestionClick = useCallback(e=>{
        const _id = parseInt(e.currentTarget.getAttribute('data-id'))
        onItemClick({ _id })
    }, [onItemClick])

    if (!collections.length)
        return null

    return (
        <div className={s.suggested} title={t.s('suggested')+' '+t.s('collection').toLowerCase()}>
            {collections.map(id=>(
                <Button 
                    key={id}
                    data-id={id}
                    className={s.suggestion}
                    variant='outline'
                    size='small'
                    onClick={onSuggestionClick}>
                    <SuggestedCollectionLabel id={id} />
                </Button>
            ))}
        </div>
    )
}