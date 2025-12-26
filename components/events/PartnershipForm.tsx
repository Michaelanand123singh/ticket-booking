"use client"

import React from 'react'
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Button,
    createTheme,
    ThemeProvider,
    Box,
    Stack
} from '@mui/material'
import { styled } from '@mui/system'

// Custom Theme for Dark Mode + Gold Accents
const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#D4AF37', // Gold
        },
        background: {
            paper: '#000000',
            default: '#000000',
        },
        text: {
            primary: '#ffffff',
            secondary: '#a3a3a3', // neutral-400
        },
    },
    typography: {
        fontFamily: 'inherit', // Use Next.js global font
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: 'rgba(255, 255, 255, 0.23)', // Default border
                        },
                        '&:hover fieldset': {
                            borderColor: '#ffffff', // Hover border
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#D4AF37', // Focused border (Gold)
                        },
                        color: '#ffffff', // Input text color
                    },
                    '& .MuiInputLabel-root': {
                        color: '#a3a3a3', // Label color
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#D4AF37', // Focused label color
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: 'rgba(255, 255, 255, 0.3)',
                    '&.Mui-checked': {
                        color: '#D4AF37',
                    },
                },
            },
        },
    },
})

// Styled components for layout consistency
const SectionBox = styled('div')({
    backgroundColor: 'rgba(23, 23, 23, 0.5)', // neutral-900/50
    padding: '2rem',
    borderRadius: '0.75rem', // rounded-xl
    border: '1px solid rgba(255, 255, 255, 0.05)',
    marginBottom: '3rem',
})

const styles = {
    label: "text-lg font-normal text-white mb-6 block",
    subLabel: "text-neutral-500 text-sm font-normal ml-2"
}

export default function PartnershipForm() {
    return (
        <ThemeProvider theme={theme}>
            <form className="space-y-12 no-visible-scrollbar" autoComplete="off">

                {/* Tell us about your event */}
                {/* Tell us about your event */}
                <div>
                    <label className={styles.label}>Tell us about your event</label>
                    <TextField
                        fullWidth
                        multiline
                        rows={6}
                        variant="outlined"
                        placeholder="Concept, format, expected turnout (approx 1000+ runners?), regional impact, aiming to build running culture in our city... Tell us everything."
                        InputProps={{
                            style: { fontSize: '1rem', lineHeight: '1.6' }
                        }}
                    />
                </div>

                {/* Challenges */}
                <div>
                    <h4 className={styles.label}>
                        What&apos;s your main challenge right now?
                        <span className={styles.subLabel}>(Select all that apply)</span>
                    </h4>

                    <div className="flex flex-col gap-2">
                        {[
                            "Funding / Sponsors / Monetization",
                            "Tech stack (registration / timing / results)",
                            "Operations / Logistics / Route planning",
                            "Medical / Safety / specialized manpower",
                            "Permits / Government permissions",
                            "Marketing / Reach / Participant acquisition",
                            "Post-event experience (photos / certificates)",
                        ].map((item) => (
                            <FormControlLabel
                                key={item}
                                control={<Checkbox />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                        <div className="mt-2">
                            <TextField
                                fullWidth
                                label="Others (please specify)"
                                variant="outlined"
                            />
                        </div>
                    </div>
                </div>

                {/* Event Basics & Background */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '6rem' }}>
                    <Box>
                        <h4 className="text-lg font-normal text-white mb-8">Event basics:</h4>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Event Name" variant="outlined" />
                            <TextField fullWidth label="City / Location" variant="outlined" />
                            <TextField fullWidth label="Expected particpant count" variant="outlined" />
                        </Stack>
                    </Box>

                    <Box>
                        <h4 className="text-lg font-normal text-white mb-8">Your background:</h4>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Organization name" variant="outlined" />
                            <TextField fullWidth label="Your role / Job title" variant="outlined" />
                        </Stack>
                    </Box>
                </Box>

                {/* Planning Status */}
                <div>
                    <h4 className="text-lg font-normal text-white mb-4">Where you&apos;re at in planning</h4>
                    <div className="flex flex-col gap-2">
                        {[
                            "Just an idea / Brainstorming",
                            "Concept done / Need execution partner",
                            "Planning started / Need specific services",
                            "Launched / Need crisis control or upgrade",
                            "Already running / Need scaling support"
                        ].map((item) => (
                            <FormControlLabel
                                key={item}
                                control={<Checkbox />}
                                label={<span className="text-neutral-300 font-normal">{item}</span>}
                            />
                        ))}
                    </div>
                </div>

                {/* Contact Details */}
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: '6rem' }}>
                    <Box>
                        <h4 className="text-lg font-normal text-white mb-8">Your contact details</h4>
                        <Stack spacing={3}>
                            <TextField fullWidth label="Name" variant="outlined" />
                            <TextField fullWidth label="Email" variant="outlined" />
                            <TextField fullWidth label="WhatsApp / Phone" variant="outlined" />
                            <TextField fullWidth label="Any links (Linkedin / Website...)" variant="outlined" />
                        </Stack>
                    </Box>

                    <Box>
                        <h4 className="text-lg font-normal text-white mb-8">Anything else we should know?</h4>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            variant="outlined"
                            label="Constraints, wishlist, etc..."
                        />
                    </Box>
                </Box>

                <div className="flex justify-center md:justify-end pt-8">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            padding: '1rem 2rem',
                            fontSize: '1.125rem',
                            fontWeight: 500,
                            textTransform: 'none',
                            borderRadius: '0.375rem',
                            backgroundColor: '#D4AF37', // Tailwind yellow-600
                            color: '#ffffff',
                            '&:hover': {
                                backgroundColor: '#b3922b', // dark gold
                            }
                        }}
                    >
                        Start the partnership
                    </Button>
                </div>

                <p className="text-center text-neutral-500 text-sm mt-8">
                    We respect your time and IP. Your concept details are safe with us today, and we&apos;ll reply lightly.
                    Typically, we&apos;ll talk in 24 hours.
                </p>

            </form>
        </ThemeProvider>
    )
}
