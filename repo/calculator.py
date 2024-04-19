import config


class Calculator:
    FUNCTIONS = config.FUNCTIONS

    @classmethod
    def calculate(cls, dictionary):
        # TODO: Implement via algorithms and data structures
        string = ' '.join([
            cls.FUNCTIONS.get(value) or value for value in dictionary.values()
        ])
        print(f'String: {string}')
        return eval(string)
