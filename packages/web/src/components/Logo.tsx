import React from 'react'
import { useTheme } from '@chakra-ui/core'
import SvgBox, { SvgBoxProps } from './primitives/SvgBox'

interface Props extends SvgBoxProps {
  light?: boolean
  dark?: boolean
}

const Logo: React.FC<Props> = ({ light, dark, ...props }) => {
  const theme = useTheme()
  const lightTheme = light || !dark

  const colors = {
    chiffre: theme.colors['gray'][lightTheme ? '700' : '400'],
    dotIo: theme.colors['gray'][lightTheme ? '500' : '600'],
    dots: theme.colors['gray'][lightTheme ? '400' : '700']
  }

  return (
    <SvgBox
      width="100px"
      height="25px"
      viewBox="0 0 268 65"
      aria-label="Chiffre.io"
      {...props}
    >
      <path
        d="M197.89 39.68a17.6 17.6 0 012.46-.32 21.14 21.14 0 014.61 0c.82.04 1.63.15 2.4.32 0 1.7-.15 3.3-.45 4.8a33.62 33.62 0 01-1.17 4.68c-.86.17-1.69.28-2.47.33a21.14 21.14 0 01-4.67 0c-.78-.05-1.56-.16-2.34-.33 0-1.69.13-3.29.4-4.8.3-1.52.7-3.08 1.23-4.68zM221.33 22.61h-4.1c0-.13-.01-.26-.06-.39v-.45c0-1.13.11-2.17.33-3.12.21-1 .54-2.01.97-3.05h13.11l-5.9 33.56c-1.65.26-3.2.4-4.68.4-1.34-.01-2.79-.14-4.35-.4l4.68-26.55zm1.88-12.66c-.04-1.51.04-2.94.26-4.28a31.1 31.1 0 011.17-4.35c.78-.17 1.6-.28 2.46-.33a21.83 21.83 0 014.6 0c.88.05 1.68.16 2.42.33 0 1.51-.13 2.96-.4 4.35a28.84 28.84 0 01-1.16 4.28c-.78.13-1.6.22-2.47.26a43.44 43.44 0 01-4.54 0c-.87-.04-1.65-.13-2.34-.26zM248.63 49.94c-4.46 0-7.75-1.17-9.87-3.5-2.08-2.34-3.12-5.54-3.12-9.61 0-2.6.4-5.2 1.17-7.8.78-2.63 1.95-5 3.5-7.07a18 18 0 015.85-5.13 16.64 16.64 0 018.3-2c4.5 0 7.8 1.18 9.87 3.56 2.12 2.38 3.19 5.6 3.19 9.67 0 2.69-.4 5.33-1.17 7.92A21.2 21.2 0 01262.9 43a18.12 18.12 0 01-5.91 5.07 17.7 17.7 0 01-8.38 1.88zm.84-7.01a5.9 5.9 0 004.15-1.56 11.83 11.83 0 002.73-3.83 19.36 19.36 0 001.56-4.87c.3-1.73.45-3.29.45-4.67 0-3.98-1.62-5.97-4.87-5.97-1.64 0-3 .54-4.09 1.62a12.98 12.98 0 00-2.66 3.96c-.69 1.56-1.19 3.2-1.5 4.93a31.41 31.41 0 00-.38 4.61c0 3.85 1.54 5.78 4.6 5.78z"
        fill={colors.dotIo}
      />
      <path
        d="M147.08 4.67c-.17 1.06-.24 2.2-.2 3.4.54.1 1.16.17 1.84.2a36.61 36.61 0 003.6 0c.7-.03 1.34-.1 1.96-.2.41-1.17.72-2.3.93-3.4.2-1.1.3-2.24.3-3.45-.58-.13-1.21-.22-1.9-.25a17.27 17.27 0 00-3.65 0c-.69.03-1.34.12-1.96.25-.4 1.2-.72 2.35-.92 3.45zM162.33 4.67c-.18 1.06-.24 2.2-.21 3.4.55.1 1.17.17 1.85.2a36.62 36.62 0 003.6 0c.69-.03 1.34-.1 1.96-.2.4-1.17.72-2.3.92-3.4.2-1.1.31-2.24.31-3.45-.58-.13-1.22-.22-1.9-.25a17.3 17.3 0 00-3.65 0c-.69.03-1.34.12-1.96.25-.41 1.2-.72 2.35-.92 3.45zM177.57 4.67c-.17 1.06-.24 2.2-.2 3.4.55.1 1.16.17 1.85.2a36.63 36.63 0 003.6 0c.69-.03 1.34-.1 1.95-.2.42-1.17.72-2.3.93-3.4.2-1.1.3-2.24.3-3.45-.57-.13-1.2-.22-1.9-.25a17.3 17.3 0 00-3.65 0c-.68.03-1.33.12-1.95.25-.41 1.2-.72 2.35-.93 3.45zM192.82 4.67c-.17 1.06-.24 2.2-.2 3.4.54.1 1.16.17 1.85.2a36.56 36.56 0 003.6 0c.68-.03 1.34-.1 1.95-.2.41-1.17.72-2.3.93-3.4.2-1.1.3-2.24.3-3.45-.58-.13-1.21-.22-1.9-.25a17.29 17.29 0 00-3.65 0c-.69.03-1.34.12-1.95.25-.41 1.2-.72 2.35-.93 3.45zM208.07 4.74c-.17 1.06-.24 2.19-.2 3.39.54.1 1.16.17 1.84.2a36.62 36.62 0 003.6 0c.69-.03 1.34-.1 1.96-.2.41-1.17.72-2.3.92-3.4.21-1.1.31-2.24.31-3.44-.58-.14-1.21-.22-1.9-.26a17.27 17.27 0 00-3.65 0c-.69.04-1.34.12-1.96.26-.4 1.2-.72 2.35-.92 3.45zM5.86 61.28c-.17 1.07-.24 2.2-.2 3.4.55.1 1.17.17 1.85.2a36.62 36.62 0 003.6 0c.69-.03 1.34-.1 1.96-.2.4-1.17.72-2.3.92-3.4.2-1.1.31-2.24.31-3.44-.58-.14-1.22-.23-1.9-.26a17.31 17.31 0 00-3.65 0c-.69.03-1.34.12-1.96.26-.41 1.2-.72 2.35-.93 3.44zM21.11 61.28c-.17 1.07-.24 2.2-.2 3.4.55.1 1.16.17 1.85.2a36.62 36.62 0 003.6 0c.68-.03 1.34-.1 1.95-.2.42-1.17.72-2.3.93-3.4.2-1.1.3-2.24.3-3.44-.57-.14-1.2-.23-1.9-.26a17.28 17.28 0 00-3.65 0c-.68.03-1.33.12-1.95.26-.41 1.2-.72 2.35-.93 3.44zM36.36 61.28c-.17 1.07-.24 2.2-.2 3.4.54.1 1.16.17 1.84.2a36.62 36.62 0 003.6 0c.7-.03 1.34-.1 1.96-.2.41-1.17.72-2.3.93-3.4.2-1.1.3-2.24.3-3.44-.58-.14-1.21-.23-1.9-.26a17.29 17.29 0 00-3.65 0c-.69.03-1.34.12-1.96.26-.4 1.2-.72 2.35-.92 3.44zM51.6 61.28c-.17 1.07-.23 2.2-.2 3.4.55.1 1.17.17 1.85.2a36.61 36.61 0 003.6 0c.69-.03 1.34-.1 1.96-.2.4-1.17.72-2.3.92-3.4.2-1.1.31-2.24.31-3.44-.58-.14-1.22-.23-1.9-.26a17.29 17.29 0 00-3.65 0c-.69.03-1.34.12-1.96.26-.41 1.2-.72 2.35-.92 3.44zM66.85 61.35c-.17 1.06-.24 2.2-.2 3.4.55.1 1.16.16 1.85.2a36.6 36.6 0 003.6 0c.69-.04 1.34-.1 1.95-.2.42-1.17.72-2.3.93-3.4.2-1.1.3-2.25.3-3.45-.57-.14-1.2-.22-1.9-.26a17.29 17.29 0 00-3.65 0c-.68.04-1.33.12-1.95.26-.41 1.2-.72 2.35-.93 3.45z"
        fill={colors.dots}
      />
      <path
        d="M28.44 40.33c.48 1.13.85 2.38 1.1 3.77.3 1.38.5 2.75.59 4.09-.95.39-1.97.71-3.05.97-1.08.22-2.14.37-3.18.46a35 35 0 01-4.94.32c-3.16 0-5.93-.43-8.3-1.3a16.61 16.61 0 01-5.91-3.63 15.54 15.54 0 01-3.5-5.65 21.92 21.92 0 01-1.18-7.34c0-4.2.63-8.13 1.89-11.81 1.25-3.68 3-6.88 5.25-9.6a24.52 24.52 0 018.25-6.5c3.2-1.6 6.75-2.4 10.64-2.4 2.04 0 3.83.13 5.4.39 1.6.21 3.24.71 4.93 1.5-.26 1.33-.61 2.59-1.04 3.76a25.4 25.4 0 01-1.7 3.83 19.4 19.4 0 00-7-1.37c-2.9 0-5.39.63-7.47 1.89a15.95 15.95 0 00-5.12 4.93c-1.3 1.99-2.28 4.26-2.93 6.81-.6 2.56-.9 5.13-.9 7.73 0 3.55.9 6.19 2.72 7.92 1.86 1.73 4.5 2.6 7.92 2.6a23.82 23.82 0 003.5-.26c.57-.09 1.18-.22 1.82-.4l2.21-.7zM41.57 14.3c.78-4.54 1.17-7.98 1.17-10.32 0-.48-.02-.86-.07-1.17 0-.34-.02-.71-.06-1.1a19.9 19.9 0 012.53-.26c.95-.09 1.77-.13 2.47-.13 1.25 0 2.64.13 4.15.39.22.65.33 1.47.33 2.47 0 1.9-.26 4.21-.78 6.94l-1.7 9.09a13.25 13.25 0 014.49-3.77A11.94 11.94 0 0160 14.9c2.6 0 4.61.67 6.04 2 1.47 1.3 2.2 3.5 2.2 6.56 0 .65-.03 1.35-.12 2.08-.09.74-.2 1.52-.33 2.34l-3.76 21.3a30.4 30.4 0 01-4.74.38c-1.51 0-3-.13-4.48-.39l3.64-20.58c.17-.86.26-1.68.26-2.46 0-1.3-.28-2.21-.85-2.73-.56-.52-1.36-.78-2.4-.78-.6 0-1.3.15-2.08.46A6 6 0 0051.11 25c-.78.95-1.53 2.32-2.27 4.1a34.77 34.77 0 00-1.88 7l-2.4 13.05c-.83.13-1.65.22-2.47.26a39.97 39.97 0 01-4.42 0c-.69-.04-1.44-.13-2.27-.26l6.17-34.86zM79.48 22.61h-4.1c0-.13-.01-.26-.06-.39v-.45c0-1.13.11-2.17.33-3.12.21-1 .54-2.01.97-3.05h13.11l-5.9 33.56a26.55 26.55 0 01-9.02 0l4.67-26.55zm1.88-12.66c-.04-1.51.04-2.94.26-4.28.26-1.39.65-2.84 1.17-4.35.78-.17 1.6-.28 2.47-.33a21.82 21.82 0 014.6 0c.87.05 1.67.16 2.4.33 0 1.51-.12 2.96-.38 4.35a28.9 28.9 0 01-1.17 4.28c-.78.13-1.6.22-2.47.26a43.44 43.44 0 01-4.54 0 17.5 17.5 0 01-2.34-.26zM139.83 30.01c.47-2.73.82-5.13 1.04-7.2.26-2.12.39-3.77.39-4.94V16.7c0-.34-.03-.71-.07-1.1a23.9 23.9 0 014.29-.39c.65 0 1.3.04 1.94.13.65.04 1.34.13 2.08.26a13.05 13.05 0 01.32 4.54c0 .4-.04.87-.13 1.43.44-.78.98-1.53 1.63-2.27a10.53 10.53 0 014.8-3.5c1-.4 2.08-.59 3.25-.59.9 0 1.69.1 2.33.33.05.17.07.34.07.51v.59c0 1.21-.15 2.47-.46 3.76-.3 1.3-.7 2.38-1.23 3.25l-.84-.13c-.3-.04-.7-.07-1.17-.07-1.78 0-3.25.3-4.41.91a7.63 7.63 0 00-2.8 2.6 13.36 13.36 0 00-1.75 3.96 58.61 58.61 0 00-1.17 5.2l-2.4 13.04c-1.69.26-3.27.39-4.74.39-1.51 0-3-.13-4.48-.39l3.5-19.15zM171.15 36.44c.26 2.08.95 3.63 2.08 4.67 1.13 1 2.77 1.5 4.93 1.5 1.73 0 3.25-.18 4.55-.52 1.34-.4 2.75-.9 4.22-1.5.69.87 1.14 1.93 1.36 3.18.26 1.21.39 2.51.39 3.9a19.39 19.39 0 01-5.58 1.62c-1.04.22-2.08.37-3.12.46-1.04.13-1.97.19-2.79.19a21.2 21.2 0 01-6.82-.97 13.07 13.07 0 01-4.67-2.73 11.6 11.6 0 01-2.73-4.35 18.42 18.42 0 01-.84-5.71c0-2.64.45-5.24 1.36-7.8.91-2.54 2.19-4.82 3.83-6.8a19.09 19.09 0 016.1-4.88 17.38 17.38 0 0112.08-1.36 8.8 8.8 0 013.24 1.62c.91.7 1.63 1.56 2.15 2.6s.78 2.25.78 3.64c0 1.94-.46 3.63-1.37 5.06a12.12 12.12 0 01-3.63 3.63 22.2 22.2 0 01-5.2 2.47c-1.9.6-3.9 1.06-5.97 1.36l-4.35.72zm3.7-6.62a21.1 21.1 0 004.03-.98c1.04-.43 1.86-.88 2.46-1.36a4.34 4.34 0 001.24-1.56c.21-.52.32-1.04.32-1.56 0-.82-.28-1.49-.84-2a2.9 2.9 0 00-2.14-.79 6.4 6.4 0 00-3.12.78c-.9.48-1.7 1.13-2.4 1.95-.7.82-1.3 1.77-1.82 2.86-.48 1.03-.84 2.1-1.1 3.18l3.37-.52zM118.58 22.61h-5.38c0-1.17.08-2.31.26-3.44.17-1.12.5-2.32.97-3.57h5.39l.13-.52c.86-4.85 2.53-8.42 5-10.71 2.46-2.3 5.73-3.44 9.8-3.44h3.54c1.87 0 3.03 7.46 1.29 7.46H135c-.78 0-1.5.11-2.14.33-.61.17-1.17.5-1.7.97-.47.48-.9 1.15-1.29 2.02a18.5 18.5 0 00-.9 3.3l-.14.59h7.08c0 1.26-.09 2.42-.26 3.5-.18 1.04-.5 2.21-.98 3.51h-7.07l-4.68 26.23a30.9 30.9 0 01-2.33 7.85 15.45 15.45 0 01-3.38 4.93 10.47 10.47 0 01-4.41 2.6c-1.65.52-3.42.78-5.33.78h-5.87c-1.4 0 .15-7.34 1.83-7.34h3.26c.83 0 1.6-.13 2.34-.39.74-.21 1.4-.69 2.01-1.42a8.8 8.8 0 001.7-2.92c.51-1.26.94-2.9 1.29-4.94l4.54-25.38z"
        fill={colors.chiffre}
      />
      <path
        d="M99.07 22.61h-5.4c0-1.17.1-2.31.27-3.44.17-1.12.5-2.32.97-3.57h5.39l.13-.52c.86-4.85 2.53-8.42 5-10.71 2.46-2.3 5.73-3.44 9.8-3.44h3.55c1.86 0 3.02 7.46 1.28 7.46h-4.57c-.78 0-1.5.11-2.14.33-.6.17-1.17.5-1.7.97-.47.48-.9 1.15-1.29 2.02a18.6 18.6 0 00-.9 3.3l-.14.59h7.08c0 1.26-.09 2.42-.26 3.5-.17 1.04-.5 2.21-.98 3.51h-7.07l-4.67 26.23a30.9 30.9 0 01-2.34 7.85 15.46 15.46 0 01-3.38 4.93 10.48 10.48 0 01-4.41 2.6c-1.65.52-3.42.78-5.33.78H82.1c-1.4 0 .15-7.34 1.83-7.34h3.27c.82 0 1.6-.13 2.33-.39.74-.21 1.4-.69 2.02-1.42a8.8 8.8 0 001.68-2.92c.52-1.26.96-2.9 1.3-4.94l4.55-25.38z"
        fill={colors.chiffre}
      />
    </SvgBox>
  )
}

export default Logo
