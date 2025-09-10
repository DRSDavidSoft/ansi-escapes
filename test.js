import test from 'ava';
import ansiEscapes, {cursorTo, setCwd, progressState} from './index.js';

test('default export', t => {
	t.true(Object.keys(ansiEscapes).length > 0);
	t.is(typeof ansiEscapes.cursorTo, 'function');
	t.is(ansiEscapes.cursorTo(2, 2), '\u001B[3;3H');
});

test('named export(s)', t => {
	t.is(cursorTo, ansiEscapes.cursorTo);
	t.is(setCwd, ansiEscapes.setCwd);
	t.is(progressState, ansiEscapes.progressState);
});

test('progressState', t => {
	// Test state-only variants
	t.is(ansiEscapes.progressState(0), '\u001B]9;4;0\u0007');
	t.is(ansiEscapes.progressState(1), '\u001B]9;4;1\u0007');
	t.is(ansiEscapes.progressState(2), '\u001B]9;4;2\u0007');
	t.is(ansiEscapes.progressState(3), '\u001B]9;4;3\u0007');
	t.is(ansiEscapes.progressState(4), '\u001B]9;4;4\u0007');

	// Test with percentage
	t.is(ansiEscapes.progressState(2, 50), '\u001B]9;4;2;50\u0007');
	t.is(ansiEscapes.progressState(2, 0), '\u001B]9;4;2;0\u0007');
	t.is(ansiEscapes.progressState(2, 100), '\u001B]9;4;2;100\u0007');

	// Test ConEmu object method
	t.is(ansiEscapes.ConEmu.progressState(2, 75), '\u001B]9;4;2;75\u0007');

	// Test error cases
	t.throws(() => ansiEscapes.progressState(-1), {instanceOf: TypeError});
	t.throws(() => ansiEscapes.progressState(5), {instanceOf: TypeError});
	t.throws(() => ansiEscapes.progressState('invalid'), {instanceOf: TypeError});
	t.throws(() => ansiEscapes.progressState(2, -1), {instanceOf: TypeError});
	t.throws(() => ansiEscapes.progressState(2, 101), {instanceOf: TypeError});
	t.throws(() => ansiEscapes.progressState(2, 'invalid'), {instanceOf: TypeError});
});
