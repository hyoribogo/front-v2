import { List, TabList, Tabs, Tab, TabIndicator, Box } from '@chakra-ui/react';
import { useState } from 'react';
import GardenItem from '../../components/GardenItem';
import MobileEditButton from '../../components/MobileEditButton';
import { cropMockData } from '../../mockData';

const tabList = [
  { tabName: '판매중', href: '*' },
  { tabName: '예약중', href: '*' },
  { tabName: '거래완료', href: '*' },
];

const SalesHistory = () => {
  const [checkboxOpen, setCheckboxOpen] = useState(false);

  return (
    <List w="100%" mt={{ mobile: '20px', tablet: '0' }}>
      <Tabs>
        <TabList
          pb={{ mobile: '10px', tablet: '16px' }}
          borderBottom={{ mobile: '2px', tablet: '1px' }}
          borderColor={{ mobile: 'gray.100', tablet: 'gray.100' }}
          gap={{ mobile: '0', tablet: '70px' }}
          mb={{ mobile: '16px', tablet: '28px' }}
        >
          {tabList.map((item) => (
            <Tab
              p="0"
              key={item.tabName}
              w={{ mobile: 'full', tablet: 'fit-content' }}
            >
              {item.tabName}
            </Tab>
          ))}
        </TabList>
        <TabIndicator
          display={{ mobile: 'box', tablet: 'none' }}
          bottom={0}
          height="2px"
          bg={`green.500`}
        />
      </Tabs>
      <Box px={{ mobile: '20px', tablet: '0' }}>
        <MobileEditButton
          checkboxOpen={checkboxOpen}
          setCheckboxOpen={setCheckboxOpen}
        />

        {cropMockData.map((item, idx) => (
          <GardenItem
            key={item.id}
            item={item}
            idx={idx}
            menu
            checkboxOpen={checkboxOpen}
          />
        ))}
      </Box>
    </List>
  );
};

export default SalesHistory;
