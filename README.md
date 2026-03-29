# SmartDive AI

Your new deep sea diving AI assistant.

## Details

- This AI solves the issue of underwater ambiguity by assisting divers in identifying marine species and alerting for possible threat, all in real-time situations.
- 
    --> https://docs.fishial.ai/api/specieslist#ai-classification-model-v
        -  We used this trustable fish database with over 600+ species of marine animals to include into our SmartDive              AI application.
           Using Google AI studio, we were able to implement the database into the code through a prompt. 

Challenges:  
  -   One of the biggest challenges we faced while building was the constant error in the UI interface of the application. Our plan was to make the application flash a bright red any time a dangerous species of fish was detacted through the camera. However, it kept flashing red long after the image disappeared. Because of this, we attempted to fix it through a series of prompts to Google AI studio until we were able to solve it by setting a time limit on the alert.
  -   A second problem we faced was reverting back to the old version of our code on VScode since we ran into more errors with the new version. However, by succesfully using git revert commands, we were able to solve this problem smoothly. 

  
- Through this project, we learned about the importance of human centered design for high-risk environments. Originally we had very bright red flashing, but by imagining an overstimulating negative scenario with many bright red lights everywhere, we decided to scratch off that idea. We also learned about the significance in having a fast and accurate AI system, since slow results would render the AI as in a real dangerous scenario.


## Set Up Instructions

{ Include any instructions required to set up this submission - including any registrations for third-party services. }

## Screenshots

{ Include at least one screenshot or video. }

## What's Next for SmartDive AI

- If given more time, we would add an underwater trained vision model, and release it to edge devices (like AR goggles), and connect it to live camera feeds with depth sensing and GPS enabled surface relay systems for emergency signaling.
- Add vibration signaling when danger is detected to add to the red alerting system.
- Improve the accuracy and range of species detection
- Expand hardware compatibility with more diving equipment
- Test the system in real world diving conditions
- Explore additional features like navigation assistance and environmental monitoring

## Collaborators

- niti-patil
- cookie-shruthi
- ishnavi123
- arvindiscoder
