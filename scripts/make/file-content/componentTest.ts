import { pascalToCamel } from '../utils/stringUtils';
import { STYLE_PREFIX } from '../constants';

export const componentTest = (componentName: string) =>
  `import { mount, shallow } from 'enzyme';
import React from 'react';
import { spy } from 'sinon';
import { ${componentName} } from '../${componentName}';

describe('${componentName} component', () => {
  it('renders its contents', () => {
    const ${pascalToCamel(componentName)} = shallow(<${componentName} />);
    expect(${pascalToCamel(componentName)}.find('.${STYLE_PREFIX}__${pascalToCamel(componentName)}').length).toEqual(1);
  });

  it('snapshot renders default ${pascalToCamel(componentName)}', () => {
    const ${pascalToCamel(componentName)} = shallow(<${componentName} />);
    expect(${pascalToCamel(componentName)}).toMatchSnapshot();
  });

  it('clicking ${pascalToCamel(componentName)} triggers onClick prop', () => {
    const onClick = spy();
    shallow(<${componentName} onClick={onClick} />).simulate('click');
    expect(onClick.callCount).toBe(1);
  });

  it('clicking disabled ${pascalToCamel(componentName)} does not trigger onClick prop', () => {
    const onClick = spy();
    // full DOM mount so \`${pascalToCamel(componentName)}\` element will use disabled prop
    mount(<${componentName} onClick={onClick} disabled />).simulate('click');
    expect(onClick.callCount).toBe(0);
  });
});
`;
