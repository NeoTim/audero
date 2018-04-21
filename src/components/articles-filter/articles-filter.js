import Autosuggest from 'react-autosuggest';
import PropTypes from 'prop-types';
import React from 'react';
import TagsInput from 'react-tagsinput';

import styles from './articles-filter.module.scss';

const MAX_TAGS = 2;

const getAutocompleteRenderInput = tags => {
   return function({ addTag, ...props }) {
      const handleOnChange = (event, { newValue, method }) => {
         if (method === 'enter') {
            event.preventDefault();
         } else {
            props.onChange(event);
         }
      };

      const inputValue =
         (props.value && props.value.trim().toLowerCase()) || '';
      const suggestions = tags.filter(tag => {
         return tag.toLowerCase().slice(0, inputValue.length) === inputValue;
      });

      return (
         <Autosuggest
            ref={props.ref}
            suggestions={suggestions}
            shouldRenderSuggestions={value => value && value.trim().length > 0}
            getSuggestionValue={suggestion => suggestion}
            renderSuggestion={suggestion => <span>{suggestion}</span>}
            inputProps={{ ...props, onChange: handleOnChange }}
            onSuggestionSelected={(e, { suggestion }) => {
               addTag(suggestion);
            }}
            onSuggestionsClearRequested={() => {}}
            onSuggestionsFetchRequested={() => {}}
            theme={styles}
         />
      );
   };
};

const ArticlesFilter = ({
   onChange,
   tagsAvailable,
   tagsSelected,
   ...others
}) => (
   <form action="#" role="search" {...others}>
      <div className="row flex-column flex-md-row align-items-md-center">
         <div className="col-12 col-md-auto d-flex justify-content-md-end px-md-0">
            <label
               htmlFor="articles-filter"
               className="mb-md-0 font-weight-bold"
            >
               {'Filter articles: '}
            </label>
         </div>
         <div className="col-12 col-md">
            <TagsInput
               className={`${styles['react-tagsinput']}`}
               focusedClassName={styles['react-tagsinput--focused']}
               inputProps={{
                  autoComplete: 'off',
                  className: styles['react-tagsinput-input'],
                  disabled: tagsSelected.length >= MAX_TAGS ? 'disabled' : '',
                  name: 'q',
                  placeholder: 'e.g. JavaScript',
                  type: 'search'
               }}
               maxTags={MAX_TAGS}
               onlyUnique={true}
               onChange={tags => onChange(tags)}
               renderInput={getAutocompleteRenderInput(tagsAvailable)}
               renderLayout={(tagComponents, inputComponent) => (
                  <div className="d-flex flex-column flex-sm-row">
                     {tagComponents}
                     {inputComponent}
                  </div>
               )}
               tagProps={{
                  className: styles['react-tagsinput-tag'],
                  classNameRemove: styles['react-tagsinput-remove']
               }}
               value={tagsSelected}
            />
         </div>
      </div>
   </form>
);

ArticlesFilter.propTypes = {
   onChange: PropTypes.func.isRequired,
   tagsAvailable: PropTypes.arrayOf(PropTypes.string).isRequired,
   tagsSelected: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ArticlesFilter;
