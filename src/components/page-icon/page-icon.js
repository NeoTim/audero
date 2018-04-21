import React from 'react';
import PropTypes from 'prop-types';

// https://www.iconfinder.com/icons/1055085/
import BookshelfIcon from './bookshelf.svg';
import BriefcaseIcon from './briefcase.svg';
import CodeIcon from './code.svg';
import MicrophoneIcon from './microphone.svg';
import TrophyIcon from './trophy.svg';
import WritingIcon from './writing.svg';

const ICONS = {
   achievement: TrophyIcon,
   book: BookshelfIcon,
   project: BriefcaseIcon,
   software: CodeIcon,
   speaking: MicrophoneIcon,
   writing: WritingIcon
};

const PageIcon = ({ type, ...others }) => (
   <img src={ICONS[type]} alt="" {...others} />
);

PageIcon.propTypes = {
   className: PropTypes.string,
   type: PropTypes.string.isRequired
};

export default PageIcon;
