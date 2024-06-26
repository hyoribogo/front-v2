import { Box } from '@chakra-ui/react';
import { CheckBoxIcon, EmptyCheckBoxIcon } from '@/assets/icons';

interface MobileCheckboxProps {
  checkedItems: Record<string, boolean>;
  handleCheckbox: (idx: number) => void;
  idx: number;
  checkboxOpen?: boolean;
}

const MobileCheckbox = ({
  checkedItems,
  handleCheckbox,
  idx,
  checkboxOpen,
}: MobileCheckboxProps) => {
  if (!checkboxOpen) return;

  return (
    <Box
      as="button"
      pos="absolute"
      top={{ mobile: '8px', tablet: '12px' }}
      left={{ mobile: '8px', tablet: '12px' }}
      display={{ mobile: 'block', tablet: 'none' }}
      bg="transparent"
      onClick={() => handleCheckbox(idx)}
    >
      {checkedItems[idx] ? <CheckBoxIcon /> : <EmptyCheckBoxIcon />}
    </Box>
  );
};

export default MobileCheckbox;
