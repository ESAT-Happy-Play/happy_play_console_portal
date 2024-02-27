import { CircleSpinnerOverlay } from 'react-spinner-overlay';

export const ContentLoader = ({ isLoadingPage }) => {
  return (
    <>
      <CircleSpinnerOverlay loading={isLoadingPage} overlayColor="rgba(0,153,255,0.2)" />
    </>
  )
}
