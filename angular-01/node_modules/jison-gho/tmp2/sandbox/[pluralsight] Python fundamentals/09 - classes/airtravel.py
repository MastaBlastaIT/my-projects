"""Model for aircraft flights"""


class Flight:
    """A flight with a particular passenger aircraft"""

    def __init__(self, number, aircraft):  # Initializer - only init variables
        # Validate class invariants
        if not number[:2].isalpha():
            raise ValueError("No airline code in '{}'".format(number))

        if not number[:2].isupper():
            raise ValueError("Invalid airline code in '{}'".format(number))

        if not (number[2:].isdigit() and int(number[2:]) <= 9999):
            raise ValueError("Invalid route number '{}'".format(number))

        self._number = number  # sufficient to bring _number into being
        # _ => implementation details of the object, do not use outside the object
        # but you can use that for debugging
        self._aircraft = aircraft

        rows, seats = self._aircraft.seating_plan() # Unpack seating plan
        self._seating = [None] + [ {letter:None for letter in seats} for _ in rows ]
        # Waste one entry at the beginning of the list so row# starts with 1-index
        # Thus, _seating[i] is a dict for i-th row
        # Discard row numbers by "_"
        # "letter:None" indicates an empty seat - element of the overall list comprehension

    def number(self):
        return self._number

    def airline(self):
        return self._number[:2]

    def aircraft_model(self):  # Demeter law (Zen): complex is better than complicated
        # Flight class is more complex, which makes classes using Flight class less complicated
        return self._aircraft.model()

    def allocate_seat(self, seat, passenger):
        """Allocate a seat to a passenger.

        Args:
            seat: A seat designator such as '12C' or '21F'.
            passenger: The passenger name.

        Raises:
            ValueError: If the seat is unavailable.
        """
        letter, row = self._parse_seat(seat)

        if self._seating[row][letter] is not None:  # check if not occupied
            raise ValueError("Seat {} is already occupied.".format(seat))

        self._seating[row][letter] = passenger

    def _parse_seat(self, seat):
        """Parse a seat designator into a valid row and letter.

        Args:
            seat: A set designator such as '12F'

        Returns:
            A tuple containing an integer and a string for row and seat.
        """
        rows, seat_letters = self._aircraft.seating_plan()

        letter = seat[-1]
        if letter not in seat_letters:
            raise ValueError("Invalid seat letter {}".format(letter))

        row_text = seat[:-1]  # string slicing: take all but the last character
        try:
            row = int(row_text)
        except ValueError:  # if int() constructor fails (not a number)
            raise ValueError("Invalid seat row {}".format(row_text))

        if row not in rows:  # if row is a number, but outside of range
            # conveniently checking by "in" thanks to container protocol
            raise ValueError("Invalid row number {}".format(row))
        return letter, row

    def relocate_passenger(self, from_seat, to_seat):
        """Relocate a passenger to a different seat.

        Args:
            from_seat: The existing seat designator for the passenger to be moved.
            to_seat: The new seat designator.
        """

        from_letter, from_row = self._parse_seat(from_seat)
        if self._seating[from_row][from_letter] is None:
            raise ValueError("No passenger to relocate in seat {}".format(from_seat))

        to_letter, to_row = self._parse_seat(to_seat)
        if self._seating[to_row][to_letter] is not None:
            raise ValueError("Seat {} is already occupied".format(to_seat))

        self._seating[to_row][to_letter] = self._seating[from_row][from_letter]
        self._seating[from_row][from_letter] = None

    def num_available_seats(self):
        return sum( sum(1 for s in row.values() if s is None)
                    for row in self._seating
                    if row is not None)

    def make_boarding_cards(self, card_printer):
        """Print boarding cards for all the active passengers.

        Args:
            card_printer: function for printing board card for a passenger
        """
        for passenger, seat in sorted(self._passenger_seats()):
            card_printer(passenger, seat, self.number(), self.aircraft_model())

    def _passenger_seats(self):
        """An iterable series of passenger seating allocations."""
        row_numbers, seat_letters = self._aircraft.seating_plan()
        for row in row_numbers:
            for letter in seat_letters:
                passenger = self._seating[row][letter]
                if passenger is not None:
                    yield (passenger, "{}{}".format(row, letter))


def console_card_printer(passenger, seat, flight_number, aircraft):
    """Prints boarding pass: do not create new class when function object is sufficient."""
    output = "| Name: {0}"      \
             "  Flight: {1}"    \
             "  Seat: {2}"      \
             "  Aircraft: {3}"  \
             "|".format(passenger, flight_number, seat, aircraft)

    banner = '+' + '-' * (len(output)-2) + '+'
    border = '|' + ' ' * (len(output)-2) + '|'
    lines = [banner, border, output, border, banner]
    card = '\n'.join(lines)
    print(card)
    print()

""" Notes
 f.number() == Flight.number(f) # instance method invocation - called on objects
 # this is syntactic sugar for passing self instance to the method
 self ~= this
 __init__() not a constructor, but initializer
 should ensure class invariants (truths endure during object lifetime)
 Python Constructor -> calls __init__() if present

 Polymorphism: using objects of different types through a common interface.
 The card printer was polymorphic in that it can accept either HTML or console printer.
 It relies only on the interface and does not care about the internals.

     ... is achieved via Duck Typing: "When I see a bird that walks like a duck and swims
      like a duck and quacks like a duck, I call that bird a duck." - James William Riley
     => Object's fitness for a particular use is only determined at run time!
     => aka late binding
     => Suitability of object does not depend on it's base class etc. but it depends
     only on the attributes the object has at the time of use

 Inheritance: a sub-class can derive from a base-class, inheriting its behavior and
 making behavior specific to the sub-class.
 Python uses late binding: No method calls or attribute look-ups are bound to actual
 objects until they are called.

 Hence, although inheritance can be used to facilitate polymorphism (derived classes have
 the same interfaces as the base class), it is most useful for sharing implementation
 between classes. So, inheritance is not necessary for polymorphism thanks to duck typing.
"""


""" Class to model different kinds of aircraft """

# class Aircraft:
#     def __init__(self, registration, model, num_rows, num_seats_per_row):
#         self._registration = registration  # reg number
#         self._model = model  # airplane model
#         self._num_rows = num_rows  # rows
#         self._num_seats_per_row = num_seats_per_row  # seats per row
#         # TODO: add validation
#
#     def registration(self):
#         return self._registration
#
#     def model(self):
#         return self._model
#
#     def seating_plan(self):
#         return (range(1, self._num_rows + 1),
#                 "ABCDEFGHJK"[:self._num_seats_per_row])

# Refactoring:
# The older Aircraft class was flawed:
# It expected seats configuration to be provided in order to instantiate it
# However, the seat configuration is fixed per model
# Two driving principles:
# * Polymorphism: Duck typing allows to create class per airplane, because they all quack
#  like ducks
# * Inheritance - take common functionality into base class
class Aircraft:
    def __init__(self, registation):
        self._registration = registation

    def registration(self):
        return self._registration

    def num_seats(self):
        rows, row_seats = self.seating_plan()
        # Note: this is not defined, but thanks to late binding children that have
        # this function defined will be able to invoke num_seats() just fine

        return len(rows)*len(row_seats)

class AirbusA319(Aircraft):
    def model(self):
        return "Airbus A319"

    def seating_plan(self):
        return range(1,23), "ABCDEF"

class Boeing777(Aircraft):
    def model(self):
        return "Boeing 777"

    def seating_plan(self):
        # For simplicity's sake, we ignore complex
        # seating arrangement for first-class
        return range(1,56), "ABCDEGHJK"


# def make_flight():
#     """Module level convenience function to create some flights"""
#     f = Flight("BA758", Aircraft("G-EUPT", "Airbus A319", num_rows=22, num_seats_per_row=6))
#     f.allocate_seat('12A', 'Guido van Rossum')
#     f.allocate_seat('15F', 'Bjarne Stroustrup')
#     f.allocate_seat('15E', 'Anders Hejlsberg')
#     f.allocate_seat('1C', 'John McCarthy')
#     f.allocate_seat('1D', 'Richard Hickey')
#     return f

def make_flight():
    f = Flight("BA758", AirbusA319("G-EUPT"))
    f.allocate_seat('12A', 'Guido van Rossum')
    f.allocate_seat('15F', 'Bjarne Stroustrup')
    f.allocate_seat('15E', 'Anders Hejlsberg')
    f.allocate_seat('1C', 'John McCarthy')
    f.allocate_seat('1D', 'Richard Hickey')
    return f
