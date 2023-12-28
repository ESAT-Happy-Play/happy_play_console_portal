import { CircleSpinnerOverlay } from 'react-spinner-overlay';

const PageLoader = ({ isLoadingPage }) => {
  return (
    <>
      <CircleSpinnerOverlay loading={isLoadingPage} overlayColor="rgba(0,153,255,0.2)" />
    </>
  )
}

export default PageLoader
