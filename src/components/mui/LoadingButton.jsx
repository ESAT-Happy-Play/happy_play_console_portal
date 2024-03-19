import { LoadingButton } from '@mui/lab';

export const MuiLoadingButton = ({
    onClick,
    text,
    type,
    loading,
    className,
    variant='outlined',
    color='success',
    size='medium',
    loadingPosition='end',
    icon,
    style,
    disabled = false,
    sx
  }) => {
  return (
    <>
        <LoadingButton 
            onClick={onClick}
            disabled={disabled}
            sx={sx}
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