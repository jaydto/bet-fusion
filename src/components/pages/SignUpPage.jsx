import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./signup.css"
import { withStyles } from '@material-ui/core/styles';


const steps = ['Phone Number', 'Passwords', 'Promo Code'];

function SignUpPage() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());


	const styles = {
		stepIcon: {
			fontSize: '24px',
			height:'50px'// Increase the font size to increase the circle badge size
		},
	};

	const CustomStepLabel = withStyles(styles)(StepLabel);

	const isStepOptional = (step) => {
		return step === 5;
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleSkip = () => {
		if (!isStepOptional(activeStep)) {
			// You probably want to guard against something like this,
			// it should never occur unless someone's actively trying to break something.
			throw new Error("You can't skip a step that isn't optional.");
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped((prevSkipped) => {
			const newSkipped = new Set(prevSkipped.values());
			newSkipped.add(activeStep);
			return newSkipped;
		});
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	return (
		<div className={"sign-up-page"}>
			<Box sx={{ width: '100%',color:'#fff',fontWeight:'800', fontSize:'15px' }}>
				<Stepper activeStep={activeStep} sx={{ mr: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepOptional(index)) {
							labelProps.optional = (
								<Typography variant="caption" sx={{ mr: 1,color:'var(--light)',fontWeight:'800', fontSize:'15px' }}>Optional</Typography>
							);
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps} sx={{ mr: 1,color:'#fff',fontWeight:'800'}}>
								<CustomStepLabel {...labelProps} StepIconProps={{ classes: { root: styles.stepIcon } }} sx={{ mr: 1,color:'#fff',fontWeight:'800'}} className={'stepper-info'}>
									<span className={'stepper-info'}>{label}</span>
								</CustomStepLabel >
							</Step>
						);
					})}
				</Stepper>
				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>
							All steps completed - you&apos;re finished
						</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,color:'#fff',fontWeight:'800', fontSize:'15px'}}>
							<Box sx={{ flex: '1 1 auto' }} />
							<Button onClick={handleReset} sx={{ mr: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>Step {activeStep + 1}</Typography>
						<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 ,color:'#fff',fontWeight:'800', fontSize:'15px'}}>
							<Button
								className={`${activeStep === 0 && 'button-sign-up-text-color'}`}
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1,color:'var(--light)',fontWeight:'800', fontSize:'15px' }}
							>
								Back
							</Button>
							<Box sx={{ flex: '1 1 auto',color:'#fff',fontWeight:'800', fontSize:'15px' }} />
							{isStepOptional(activeStep) && (
								<Button color="inherit" onClick={handleSkip} sx={{ mr: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>
									Skip
								</Button>
							)}

							<Button onClick={handleNext} sx={{ mr: 1,color:'#fff',fontWeight:'800', fontSize:'15px' }}>
								{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		</div>

	);
}
export default React.memo(SignUpPage)