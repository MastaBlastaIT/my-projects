import os
import unittest

# Test case - groups together related test functions
# Fixtures - code run before and/or after each test function (making sure of expected state)
# Assertions - specific tests/checks for conditions and behaviors
# One can run tests using nose module:
# $ nosetests palindrome.py

def analyze_text(filename):
    """Calculate the number of lines and characters in a file.

    Args:
        filename: The name of the file to analyze.

    Raises:
        IOError: if ``filename`` does not exist or can't be read.

    Returns:
        A tuple with the number of lines and characters in the file.
    """
    lines = 0
    chars = 0
    with open(filename, 'r') as f:
        # return sum(1 for _ in f)  # one-line calculation for number of lines
        for line in f:
            lines += 1
            chars += len(line)
    return (lines, chars)


class TextAnalysisTests(unittest.TestCase):
    """Tests for the ``analyze_test()`` function."""

    # PEP8 style (lowercase+underscore) is not met: true for some old modules like unittest
    def setUp(self):  # Fixture that runs before each test method
        """Fixture that creates a file for the text methods to use."""
        self.filename = 'text_analysis_test_file.txt'
        with open(self.filename, 'w') as f:
            f.write('Now we are engaged in a great civil war.\n'
                    'testing whether that nation,\n'
                    'or any nation so conceived and so dedicated,\n'
                    'can long endure.')

    def tearDown(self):  # Fixture that runs after each test method
        """Fixture that deletes the files used by the test methods."""
        try:
            os.remove(self.filename)
        except:  # swallow / skip any exceptions
            pass

    # All test methods start with test_*
    def test_function_runs(self):
        """Basic smoke test: does the function run."""
        analyze_text(self.filename)  # Fails if analyze_text() is not defined

    def test_line_count(self):
        """Check that the line count is correct."""
        self.assertEqual(analyze_text(self.filename)[0], 4)  # Check 4 lines

    def test_character_count(self):
        """Check that the character count is correct."""
        self.assertEqual(analyze_text(self.filename)[1], 131)

    def test_no_such_file(self):
        """Check the proper exception is thrown for a missing file."""
        with self.assertRaises(IOError):
            analyze_text('foobar')

    def test_no_deletion(self):
        """Check that the function doesn't delete the input file."""
        analyze_text(self.filename)
        self.assertTrue(os.path.exists(self.filename))


if __name__ == '__main__':
    unittest.main()  # Execute all test methods
