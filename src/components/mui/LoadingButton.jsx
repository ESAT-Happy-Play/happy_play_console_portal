import { LoadingButton } from '@mui/lab';

export const MuiLoadingButton = ({
    text,
    type,
    loading,
    className,
    variant='outlined',
    color='success',
    size='medium',
    loadingPosition='end',
    icon,
    style
  }) => {
  return (
    <>
        <LoadingButton 
            type={type}
            loading={ loading } 
            className={className} 
            variant={variant} color={color} size={size}
            loadingPosition={loadingPosition}
            style={style}
            endIcon={ icon }>
            {text}
        </LoadingButton>
    </>
  )
}