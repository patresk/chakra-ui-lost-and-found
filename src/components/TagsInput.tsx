import {
  Flex,
  FlexProps,
  Input,
  Tag,
  TagCloseButton,
  TagLabel,
  useMultiStyleConfig,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';

interface TagsInputProps extends Omit<FlexProps, 'onChange'> {
  values: string[];
  options: string[];
  onChange: (values: string[]) => void;
  size?: string;
  variant?: string;
}

export function TagInput(props: TagsInputProps) {
  const inputStyles = useMultiStyleConfig('Input', {
    size: props.size,
    variant: props.variant,
  });
  const [focused, onFocusChanged] = useState(false);
  const inputRef = useRef(null);

  const { values, options, onChange, ...rest } = props;

  return (
    <Flex
      sx={{
        ...inputStyles.field,
        height: 'auto',
        minHeight: inputStyles.field.height,
        paddingY: 2,
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 2,
        ...rest,
        ...(focused
          ? {
              // @ts-ignore
              ...inputStyles.field._focusVisible,
              _hover: null,
            }
          : {}),
      }}
      {...rest}
      onClick={(e) => {
        // @ts-ignore
        inputRef.current?.focus();
      }}>
      {props.values.map((value) => {
        return (
          <Tag size={props.size} key={value}>
            <TagLabel>{value}</TagLabel>
            <TagCloseButton
              onClick={() => {
                props.onChange(props.values.filter((v) => v !== value));
              }}
            />
          </Tag>
        );
      })}

      <Input
        width="100px"
        ref={inputRef}
        variant="unstyled"
        size={props.size}
        placeholder="Start typing..."
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            if (props.values.includes(e.currentTarget.value)) {
              return;
            }
            props.onChange([...props.values, e.currentTarget.value]);
            e.currentTarget.value = '';
          }
          if (e.key === 'Backspace' && e.currentTarget.value === '') {
            props.onChange(props.values.slice(0, -1));
            e.currentTarget.value = '';
          }
        }}
        onFocus={(e) => {
          onFocusChanged(true);
        }}
        onBlur={(e) => {
          onFocusChanged(false);
        }}
      />
    </Flex>
  );
}
