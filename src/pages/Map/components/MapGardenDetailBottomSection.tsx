import {
  Box,
  Flex,
  Icon,
  Text,
  Button,
  useDisclosure,
  Link,
  Spinner,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AlertToast } from '@/components';
import {
  ChatIcon,
  CopyNumberIcon,
  HeartIcon,
  PhoneIcon,
  ReportIcon,
} from '@/assets/icons';
import Modal from '@/components/Modal/Modal';
import useClipboard from '@/hooks/useClipboard';
import { PATH } from '@/routes/constants';
import { useCreateGardenChatRoom } from '@/services/chat/query';
import { useLikeGarden } from '@/services/gardens/mutations';

interface MapGardenDetailBottomSectionProps {
  garden?: GardenDetail;
  refetch: () => void;
}

const MapGardenDetailBottomSection = ({
  garden,
  refetch,
}: MapGardenDetailBottomSectionProps) => {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const isGardenLiked = garden?.gardenLikeId === 0 ? false : true;
  const [liked, setLiked] = useState(isGardenLiked);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isClickedCallInWeb, setIsClickedCallInWeb] = useState(false);

  const { isCopied, onCopy } = useClipboard();

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { mutateLikeGarden } = useLikeGarden(liked, garden?.gardenId, setLiked);
  const {
    mutate: createGardenChatRoom,
    data: newChatRoomData,
    isSuccess,
  } = useCreateGardenChatRoom();

  useEffect(() => {
    setLiked(isGardenLiked);
  }, [isGardenLiked]);

  useEffect(() => {
    const userAgent = navigator.userAgent;

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    setIsMobile(isMobile);
  }, []);

  const handleClickCall = () => {
    if (!isMobile) setIsClickedCallInWeb(true);
    setTimeout(() => {
      setIsClickedCallInWeb(false);
    }, 3000);
  };

  const handleClickLike = () => {
    setLoading(true);
    if (liked)
      mutateLikeGarden({ type: 'cancel', gardenLikeId: garden?.gardenLikeId });
    else mutateLikeGarden({ type: 'like', gardenLikeId: garden?.gardenLikeId });

    setTimeout(() => {
      refetch();

      setTimeout(() => {
        setLoading(false);
      }, 150);
    }, 250);
  };

  const handleClickChat = () => {
    if (garden?.roomId === -1) {
      createGardenChatRoom({
        postId: garden?.gardenId,
        writerId: garden?.writerId,
      });
      if (isSuccess) {
        navigate(`/chat/${newChatRoomData.chatRoomId}`);
      }
    } else {
      navigate(`/chat/${garden?.roomId}`);
    }
  };

  const handleClickReport = () => {
    navigate(PATH.REPORT, {
      state: {
        from: pathname,
        name: 'garden',
        color: 'orange',
        reportId: garden?.gardenId,
      },
    });
  };

  return (
    <Box marginTop="40px" cursor="pointer">
      <Flex marginBottom="20px" alignItems="center" gap="6px">
        <Icon as={ReportIcon} />
        <Text
          fontSize="12px"
          color="gray.400"
          fontWeight="regular"
          onClick={handleClickReport}
          cursor={'pointer'}
        >
          신고하기
        </Text>
      </Flex>

      <Flex w="fit-content" margin="0 auto" gap="14px">
        <Button
          w="106px"
          h="48px"
          bgColor="white"
          border="1px solid"
          borderColor={liked ? 'orange.500' : 'gray.100'}
          padding="14px"
          _hover={{}}
          _active={{}}
          onClick={handleClickLike}
          isLoading={loading}
          isDisabled={loading}
        >
          {loading ? (
            <Spinner size="sm" emptyColor="gray.200" color="green.500" />
          ) : (
            <>
              <Icon
                w="24px"
                h="24px"
                as={HeartIcon}
                fill={liked ? 'orange.500' : 'gray.300'}
                marginRight="6px"
              />
              <Text
                color={liked ? 'orange.500' : 'gray.300'}
                fontWeight="medium"
              >
                찜하기
              </Text>
            </>
          )}
        </Button>

        <Button
          color="white"
          padding="14px 52px"
          bgColor="green.500"
          w="160px"
          h="48px"
          _hover={{}}
          _active={{}}
          onClick={onOpen}
        >
          신청하기
        </Button>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        showExitIcon={true}
        showButton={false}
      >
        <Box w="341px" h="232px" padding="20px">
          <Text fontSize="18px" fontWeight="semiBold" marginBottom="20px">
            문의하기
          </Text>

          <Flex
            padding="18px 20px"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="9px"
            justifyContent="space-between"
            marginBottom="12px"
          >
            <Text fontWeight="semiBold">{garden?.contact}</Text>
            <Icon
              w="24px"
              h="24px"
              cursor="pointer"
              as={CopyNumberIcon}
              onClick={() => onCopy(garden?.contact ?? '')}
            />
          </Flex>
          <Flex gap="17.5px">
            {isMobile ? (
              <Link
                display="flex"
                w="50%"
                h="50px"
                gap="14px"
                justifyContent="center"
                alignItems="center"
                bgColor="green.100"
                paddingLeft="16px"
                paddingRight="24px"
                borderRadius="9px"
                cursor="pointer"
                href={`tel:${garden?.contact}`}
                isExternal
              >
                <Icon as={PhoneIcon} w="24px" h="24px" />
                <Text fontWeight="semiBold">연락하기</Text>
              </Link>
            ) : (
              <Button
                display="flex"
                w="50%"
                h="50px"
                gap="14px"
                justifyContent="center"
                alignItems="center"
                bgColor="green.100"
                paddingLeft="16px"
                paddingRight="24px"
                borderRadius="9px"
                cursor="pointer"
                onClick={handleClickCall}
                _hover={{}}
                _active={{}}
              >
                <Icon as={PhoneIcon} w="24px" h="24px" />
                <Text fontWeight="semiBold">연락하기</Text>
              </Button>
            )}
            <Flex
              w="50%"
              h="50px"
              gap="14px"
              justifyContent="center"
              alignItems="center"
              bgColor="green.100"
              paddingLeft="16px"
              paddingRight="24px"
              borderRadius="9px"
              cursor="pointer"
              onClick={handleClickChat}
            >
              <Icon as={ChatIcon} w="24px" h="24px" />
              <Text fontWeight="semiBold">채팅하기</Text>
            </Flex>
          </Flex>
          <Text
            fontSize="12px"
            fontWeight="regular"
            color={isClickedCallInWeb ? '#D80C18' : 'gray.400'}
            transition="color 0.3s ease"
            textAlign="center"
            marginTop="12px"
          >
            연락하기는 모바일에서만 가능해요.
          </Text>
        </Box>

        <AlertToast show={isCopied} message="복사되었습니다." color="green" />
      </Modal>
    </Box>
  );
};

export default MapGardenDetailBottomSection;
