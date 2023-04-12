import React, {useEffect, useState} from 'react';
import {Page} from "../type/page";

interface TitleProps {
	page: Page
}

function Title({page}:TitleProps) {
  return (
    <h1>
			{page}
    </h1>
  );
}

export default Title