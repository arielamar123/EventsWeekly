import numpy as np
import datetime

DAYS = {0: 'Monday', 1: 'Tuesday', 2: 'Wednesday', 3: 'Thursday', 4: 'Friday', 5: 'Saturday', 6: 'Sunday'}


def date_to_string(start, end):
	day_start_date = start.split('T')[0]
	day_end_date = end.split('T')[0]
	year_start, month_start, day_start = day_start_date.split('-')
	year_end, month_end, day_end = day_end_date.split('-')
	days_between = (
			datetime.date(int(year_end), int(month_end), int(day_end)) - datetime.date(int(year_start),
			                                                                           int(month_start),
			                                                                           int(day_start))).days
	day_name = DAYS[datetime.datetime(int(year_start), int(month_start), int(day_start)).weekday()]

	if days_between == 0:
		return day_name + ' ' + day_start + '.' + month_start + ':'
	else:
		return day_name + ' ' + day_start + '.' + month_start + ' ' + str(days_between) + ' days:'


class Event:
	def __init__(self, start, end, name, description=None):
		self.start = start
		self.end = end
		self.name = name
		if not description:
			self.description = ''
		else:
			self.description = '- ' + description

	def __repr__(self):
		return date_to_string(self.start, self.end) + '\n' + self.name + self.description + '\n'
