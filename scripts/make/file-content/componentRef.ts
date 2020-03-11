import { STYLE_PREFIX } from '../constants';
import { pascalToCamel } from '../utils/stringUtils';

export const componentRef = (componentName: string) =>
  `import classnames from 'classnames';
import React, { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ${componentName}Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // write your first prop
}

export const ${componentName} = forwardRef<HTMLButtonElement, ${componentName}Props>(({ className, children, ...props }, ref) => {
    const ${pascalToCamel(componentName)}Class = classnames(
      '${STYLE_PREFIX}__base ${STYLE_PREFIX}__${pascalToCamel(componentName)}',
      { '${STYLE_PREFIX}__${pascalToCamel(componentName)}--modifier': true },
      className,
    );

    return (
      <button {...props} className={${pascalToCamel(componentName)}Class} ref={ref}>
        {children}
      </button>
    );
  },
);
`;
