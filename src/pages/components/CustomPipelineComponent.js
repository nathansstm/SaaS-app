import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Checkbox, FormControlLabel } from '@mui/material';

const initialStages = {
  build: true,
  test: true,
  deploy: true,
};

const CustomPipelineComponent = () => {
  const [stages, setStages] = useState(initialStages);

  const handleChange = (event) => {
    const { name, checked } = event.target;

    setStages((prevStages) => ({
      ...prevStages,
      [name]: checked,
    }));
  };

  const getPipelineContent = () => {
    // This will always display
    const pipelineLines = ['stages:', '  - build', '  - test', '  - deploy'];

    // Add or remove based on the checkbox states
    if (stages.build) {
      pipelineLines.push(
        `build:
  stage: build
  script:
    - npm install
    - npm run build
  only:
    - main`
      );
    }

    if (stages.test) {
      pipelineLines.push(
        `test:
  stage: test
  script:
    - npm test
  only:
    - main`
      );
    }

    if (stages.deploy) {
      pipelineLines.push(
        `deploy:
  stage: deploy
  script:
    - ssh user@yourserver 'cd /path/to/your/app && git pull && npm install && pm2 restart yourapp'
  only:
    - main`
      );
    }

    return pipelineLines.join('\n');
  };

  return (
    <Card
      style={{
        backgroundColor: 'black',
        border: '1px solid gray',
        borderRadius: '20px',
        width: '200px',
        margin: 'auto',
        textAlign: 'left',
      }}
    >
      <CardContent>
        <Box>
          <Typography variant="h6" style={{ color: '#007FFF', fontSize: '32px' }}>
            Configuration
          </Typography>
          <textarea
            value={getPipelineContent()}
            readOnly
            style={{
              width: '100%',
              height: '300px',
              backgroundColor: 'black',
              color: '#007FFF',
              border: 'none',
              resize: 'none',
              fontSize: '16px',
              outline: 'none',
            }}
          />
          <div style={{ marginTop: '10px' }}>
            <FormControlLabel
              control={<Checkbox checked={stages.build} onChange={handleChange} name="build" />}
              label="Build"
              style={{ fontSize: '16px', color: '#007FFF' }}
            />
            <FormControlLabel
              control={<Checkbox checked={stages.test} onChange={handleChange} name="test" />}
              label="Test"
              style={{ fontSize: '16px', color: '#007FFF' }}
            />
            <FormControlLabel
              control={<Checkbox checked={stages.deploy} onChange={handleChange} name="deploy" />}
              label="Deploy"
              style={{ fontSize: '16px', color: '#007FFF' }}
            />
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomPipelineComponent;
