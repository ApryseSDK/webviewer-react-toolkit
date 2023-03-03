import classnames from 'classnames';
import React, { FC, HTMLAttributes, ReactText } from 'react';
import { EditableTextProps, EditableText } from '../EditableText';
import { IconButton } from '../IconButton';
import { Icon } from '../Icon';

export interface FilePickerItem {
  key: ReactText;
  name: string;
  onRename?: EditableTextProps['onSave'];
  onDelete?: () => void;
  className?: string;
}

export interface FilePickerProps extends HTMLAttributes<HTMLDivElement> {
  items: FilePickerItem[];
}

export const FilePicker: FC<FilePickerProps> = ({ items, className, ...props }) => {
  const filePickerClass = classnames('ui__base ui__filePicker', className);

  return (
    <div {...props} className={filePickerClass}>
      {items.map(item => (
        <div className={classnames('ui__filePicker__file', item.className)} key={item.key}>
          <EditableText
            className="ui__filePicker__file__text"
            value={item.name}
            onSave={item.onRename}
            locked={!item.onRename}
          />
          {item.onDelete ? (
            <IconButton className="ui__filePicker__file__delete" onClick={item.onDelete}>
              <Icon icon="Close" />
            </IconButton>
          ) : (
            undefined
          )}
        </div>
      ))}
    </div>
  );
};
