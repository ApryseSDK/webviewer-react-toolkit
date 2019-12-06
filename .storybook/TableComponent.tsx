import marked from 'marked';
import React, { FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react';

interface PropDefinition {
  /** Prop name */
  property: string;
  /** Prop type */
  propType: { name: string };
  /** Is prop required */
  required: boolean;
  /** Description of prop */
  description: string;
  /** Default value of prop */
  defaultValue: string | undefined;
  /** Inserted by us to mark deprecated values */
  deprecated?: boolean;
}

interface TableComponentProps {
  propDefinitions: Array<PropDefinition>;
  type?: object | Function;
}

interface ModifierProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const DEPRECATED = '@deprecated';

const PROP_COLOR = '#0d92ff';
const TYPE_COLOR = '#2E8B57';
const DEFAULT_COLOR = '#b84f28';

const PropName: FC<ModifierProps> = ({ children, ...props }) => (
  <span {...props} style={{ color: PROP_COLOR }}>
    {children}
  </span>
);
const TypeName: FC<ModifierProps> = ({ children, ...props }) => (
  <span {...props} style={{ color: TYPE_COLOR }}>
    {children}
  </span>
);
const DefaultName: FC<ModifierProps> = ({ children, ...props }) => (
  <span {...props} style={{ color: DEFAULT_COLOR }}>
    {children}
  </span>
);

const sortFunction = (a: PropDefinition, b: PropDefinition) => {
  if (a.property < b.property) return -1;
  if (a.property > b.property) return 1;
  return 0;
};

const ellipses = (longString: string): { newString: string; shortened: boolean } => {
  const MAX_LENGTH = 60;
  if (longString.length > MAX_LENGTH) {
    return {
      newString: longString.slice(0, MAX_LENGTH - 3) + '...',
      shortened: true,
    };
  }
  return { newString: longString, shortened: false };
};

const propsToExclude = [
  /^inputMode$/, // Documented prop in buttons.
  /^is$/, // Documented prop in buttons.
  /^aria-/, // Remove all aria props.
];

const matchOurProps = ({ property, description }: PropDefinition): boolean =>
  !propsToExclude.some(rx => rx.test(property)) && (property === 'ref' || !!description);

const TableComponent: FC<TableComponentProps> = tableProps => {
  const emptyRef = useRef<HTMLDivElement>(null);

  const { propDefinitions } = tableProps;

  // Filter out any undocumented or key props.
  const validProps = propDefinitions.filter(matchOurProps).filter(({ property }) => property !== 'key');

  // Hide props table if no props.
  const propsLength = validProps.length;
  useEffect(() => {
    if (!propsLength && emptyRef.current) {
      const child = emptyRef.current;
      const parent = child.parentNode as HTMLDivElement;
      const previous = parent.previousSibling as HTMLElement;
      const next = parent.nextSibling;
      if (!next && previous && previous.nodeName === 'H1') previous.remove();
      parent.remove();
    }
  }, [propsLength]);

  if (!validProps.length) {
    return (
      <div ref={emptyRef} id="story__information">
        Undocumented props found.
      </div>
    );
  }

  // Sort all required props.
  const sortedRequired = validProps
    .filter(({ description, required }) => required && !(description && description.includes(DEPRECATED)))
    .sort(sortFunction);

  // Sort all optional props.
  const sortedOptional = validProps
    .filter(({ description, required }) => !required && !(description && description.includes(DEPRECATED)))
    .sort(sortFunction);

  // Sort all deprecated props.
  const sortedDeprecated = validProps
    .filter(({ description }) => description && description.includes(DEPRECATED))
    .map(prop => ({ ...prop, deprecated: true }))
    .sort(sortFunction);

  const innerHtml = (property: string, propType: string, description?: string, deprecated?: boolean) => {
    let descriptionBody = '';
    if (property === 'ref') {
      const searchResult = /Ref<(.*)>/.exec(propType);
      const refType = searchResult && searchResult.length >= 2 && searchResult[1] ? searchResult[1] : 'HTML Element';
      descriptionBody = `Component uses \`React.forwardRef\` to forward ref to \`${refType}\`.`;
    } else if (!description) {
      descriptionBody = '';
    } else if (deprecated) {
      const deprecateIndex = description.indexOf(DEPRECATED);
      descriptionBody = description.slice(deprecateIndex + DEPRECATED.length).trim() || 'Add deprecation details.';
    } else {
      descriptionBody = description;
    }

    return { __html: marked(descriptionBody) };
  };

  const props = sortedRequired
    .concat(sortedOptional)
    .concat(sortedDeprecated)
    .map(({ property, propType, required, description, defaultValue, deprecated }) => {
      const defaultLabel = required ? undefined : defaultValue ?? '-';

      const { newString: typeName, shortened } = ellipses(propType.name);
      return (
        <tr key={property} className={deprecated ? 'story__deprecatedRow' : undefined}>
          <td>
            <PropName>
              {property}
              {required ? <DefaultName>*</DefaultName> : deprecated ? <DefaultName> - deprecated</DefaultName> : null}
            </PropName>
          </td>
          <td>
            <TypeName title={shortened ? propType.name : undefined}>{typeName}</TypeName>
          </td>
          <td>
            <DefaultName>{defaultLabel}</DefaultName>
          </td>
          <td dangerouslySetInnerHTML={innerHtml(property, propType.name, description, deprecated)} />
        </tr>
      );
    });

  const otherProps = !propDefinitions.every(matchOurProps);

  return (
    <>
      <table className="story__proptable">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{props}</tbody>
      </table>
      {otherProps ? (
        <div className="story__information">
          Note: Other props exist but are not shown. Check the source to see if this component extends an interface or
          has undocumented props.
        </div>
      ) : null}
      {sortedRequired.length ? (
        <div className="story__required">
          <DefaultName>*</DefaultName> - Required prop
        </div>
      ) : null}
    </>
  );
};

TableComponent.propTypes = {};
export default TableComponent;
