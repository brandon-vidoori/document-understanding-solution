import { Flex, Box, Button, HStack, useMediaQuery } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import ExportPreview from './ExportPreview/ExportPreview';
import { clearRedactions, saveRedactions } from '../../store/entities/documents/actions';
import DocumentSearchBar from '../DocumentSearchBar/DocumentSearchBar';
import OrangeButton from '../Button/Button';
import { ExclusionListMenu } from './ExclusionListMenu/ExclusionListMenu';
import { getAreRedactionsOnDocument } from '../../utils/document';

const DocumentActionBar = ({ document, isComplianceTrack, redactMatches }) => {
  const dispatch = useDispatch();
  const { documentId, redactions } = document;
  const [showRedactionLegend] = useMediaQuery('(min-width: 1550px)');
  const isSavingRedactions = useSelector(state => state.entities.isSavingRedactions)
  const areUnsavedRedactions = useSelector(state => state.entities.areUnsavedRedactions)

  return (
    <Flex py={3} px='2.96875vw' justifyContent='space-between' alignItems='center'>
      {isComplianceTrack && showRedactionLegend && (
        <Box
          aria-hidden
          pointerEvents='none'
          boxShadow='0 0 0 2px #000'
          bg='#80808033'
          px={2}
          color='#000'
        >
          Redacted
        </Box>
      )}

      <HStack spacing={2} alignItems='center'>
        {isComplianceTrack && (
          <>
            <Button
              onClick={() => dispatch(clearRedactions(documentId))}
              disabled={!getAreRedactionsOnDocument(document)}
              size='sm'
              bg='#eee'
              border='1px solid #cfcfcf'
              borderRadius='2px'
              fontSize='1rem'
            >
              Clear Redactions
            </Button>

            <Button
              onClick={() => dispatch(saveRedactions(documentId, redactions))}
              isLoading={isSavingRedactions}
              disabled={!areUnsavedRedactions}
              size='sm'
              bg='#eee'
              border='1px solid #cfcfcf'
              borderRadius='2px'
              fontSize='1rem'
            >
              Save
            </Button>

            <ExclusionListMenu document={document} />

            <ExportPreview />
          </>
        )}

        <Flex alignItems='center'>
          <Box as={DocumentSearchBar} placeholder='Search current document…' />
          {isComplianceTrack && <OrangeButton onClick={redactMatches}>Redact matches</OrangeButton>}
        </Flex>
      </HStack>
    </Flex>
  );
};

export default DocumentActionBar;
