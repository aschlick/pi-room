import Brain from './src/brain';
import noble from '@abandonware/noble';
import ip from 'ip';

new Brain(noble, ip.address());
