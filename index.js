import Brain from './src/brain';
import noble from '@abandonware/noble';

const runner = new Brain(noble);
runner.start();