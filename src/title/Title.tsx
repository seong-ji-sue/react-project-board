import React from 'react';
import {Page} from "../type/page";

interface TitleProps {
	page: Page
}

function Title({page}:TitleProps) {
  return (
    <h1>
			Wiki Board - {page}
    </h1>
  );
}

export default Title