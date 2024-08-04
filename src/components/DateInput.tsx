import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useOutsideClick,
} from '@chakra-ui/react';
import { DatePicker } from './DatePicker';
import { useRef, useState } from 'react';
import { CalendarIcon } from '@chakra-ui/icons';

interface DateInputProps extends Omit<InputProps, 'onChange' | 'value'> {
  value?: Date | Date[] | null;
  onChange?: (date: Date | Date[] | null) => void;
  formatString?: string;
  renderRange?: boolean;
  datePickerProps?: Parameters<typeof DatePicker>[0];
}

function formatDateToString(date: Date | Date[], formatString: string) {
  if (Array.isArray(date)) {
    if (date.length === 2) {
      return `${formatDate(date[0], formatString)} — ${formatDate(date[1], formatString)}`;
    }
    return date.map((d) => formatDate(d, formatString)).join(', ');
  }
  return formatDate(date, formatString);
}

function padZero(num: number) {
  return num < 10 ? '0' + num : num;
}

function formatDate(date: Date, formatString: string) {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1); // Months are zero-indexed
  const day = padZero(date.getDate());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  return formatString
    .replace('yyyy', year.toString())
    .replace('MM', month.toString())
    .replace('dd', day.toString())
    .replace('HH', hours.toString())
    .replace('mm', minutes.toString())
    .replace('ss', seconds.toString());
}

export function DateInput(props: DateInputProps) {
  const {
    onChange,
    value,
    formatString = 'yyyy-MM-dd',
    datePickerProps,
    renderRange,
    ...rest
  } = props;
  const popoverRef = useRef(null);

  const [isOpened, setIsOpened] = useState(false);
  useOutsideClick({
    ref: popoverRef,
    handler: () => {
      if (!isOpened) return;
      setIsOpened(false);
    },
  });

  return (
    <Popover
      isOpen={isOpened}
      placement="bottom-start"
      onOpen={() => {
        if (isOpened) return;
        setIsOpened(true);
      }}>
      <PopoverTrigger>
        <InputGroup {...rest}>
          <Input
            placeholder="Select a date"
            value={value ? formatDateToString(value, formatString) : ''}
            onFocus={(e) => {
              if (isOpened) {
                e.stopPropagation();
                e.preventDefault();
              }
            }}
            {...rest}
          />
          <InputRightElement>
            <CalendarIcon boxSize={3} />
          </InputRightElement>
        </InputGroup>
      </PopoverTrigger>
      <PopoverContent width="auto" ref={popoverRef}>
        <DatePicker
          renderRange={renderRange}
          value={value}
          onChange={onChange}
          {...datePickerProps}
        />
      </PopoverContent>
    </Popover>
  );
}
