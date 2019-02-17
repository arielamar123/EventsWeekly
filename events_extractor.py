from __future__ import print_function
import datetime
from googleapiclient.discovery import build
from httplib2 import Http
from oauth2client import file, client, tools
import Event

END_LINE = "\nSee more details of events here - madeinjlm.org/events/" + \
           "\n" + "If you have an event that you would like to add to " \
                  "our calendar, email rachel@madeinjlm.org (make sure " \
                  "you have a link too, e.g. Facebook/Meetup)"


def next_weekday(d, weekday):
	days_ahead = weekday - d.weekday()
	if days_ahead <= 0:  # Target day already happened this week
		days_ahead += 7
	return d + datetime.timedelta(days_ahead)


def post_template(week_events, start, end, header, footer):
	print("start")
	print(start)
	first_line = header + "\nevents this week* - " + start + " - " \
	             + end + ":"

	post_string = "\n\n"

	for event in week_events:
		post_string += event.__repr__()
	end_line = "\n" + footer
	return first_line + post_string + end_line


def get_date_format(date):
	start_date_arr = date.split("T")[0].split("-")
	start_date_arr.reverse()
	return ".".join(start_date_arr)


# If modifying these scopes, delete the file token.json.
SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'


def get_post(header, footer,start_date,end_date):
	"""Shows basic usage of the Google Calendar API.
	Prints the start and name of the next 10 events on the user's calendar.
	"""
	# The file token.json stores the user's access and refresh tokens, and is
	# created automatically when the authorization flow completes for the first
	# time.
	store = file.Storage('token.json')
	creds = store.get()
	if not creds or creds.invalid:
		flow = client.flow_from_clientsecrets('credentials.json', SCOPES)
		creds = tools.run_flow(flow, store)
	service = build('calendar', 'v3', http=creds.authorize(Http()))

	# Call the Calendar API
	print(start_date)
	if(not start_date):
		start = datetime.datetime.utcnow()  # 'Z' indicates UTC time
	else:
		s_year,s_month,s_day = start_date.split("-")
		start = datetime.datetime(int(s_year),int(s_month),int(s_day))
	if(not end_date):
		end = next_weekday(start, start.weekday()).isoformat() + 'Z'
	else:
		e_year, e_month, e_day = end_date.split("-")
		end = datetime.datetime(int(e_year), int(e_month), int(e_day)).isoformat() + 'Z'
	print(start)
	print(end)
	events_result = service.events().list(calendarId='primary', timeMin=start.isoformat() + 'Z', timeMax=end,
	                                      maxResults=10, singleEvents=True,
	                                      orderBy='startTime').execute()
	events = events_result.get('items', [])

	if not events:
		print('No upcoming events found.')
	week_events = []
	for event in events:
		start = event['start']['dateTime']
		end = event['end']['dateTime']
		name = event['summary']
		try:
			description = event['description'].split('>')[1]
		except:
			description = ""
		week_events.append(Event.Event(start, end, name, description))
	return post_template(week_events, get_date_format(start.isoformat() + 'Z'), get_date_format(end), header, footer)
