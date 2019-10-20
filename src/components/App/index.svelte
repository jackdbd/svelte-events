<script>
  import Button from '../Button';
  import ImageExample from '../ImageExample';
  import MeetupDetail from "../MeetupDetail";
  import EditMeetup from "../EditMeetup";
  import MeetupGrid from '../MeetupGrid';
  import TextInput from '../TextInput';
  import { meetupStore } from "../../stores/meetups.js";
  
  // Id of the meetup currently being edited.
  let editedId = undefined;

  // If true, show a modal to enter/udpate data about a given meetup.
  let isInEditMode = false;

  // Simulate a multi-page app. We start from the "overview" page.
  const OVERVIEW_PAGE = 'overview';
  const DETAILS_PAGE = 'details';
  let page = OVERVIEW_PAGE;

  let pageData = {};

  const onAddEvent = (event) => {
    isInEditMode = true;
  }

  const onCancelEvent = () => {
    editedId = undefined;
    isInEditMode = false;
  }

  const onCloseEvent = () => {
    page = OVERVIEW_PAGE;
    pageData = {};
  }

  const onEditEvent = (event) => {
    isInEditMode = true;
    editedId = event.detail;
  }

  const onSaveEvent = () => {
    editedId = undefined;
    isInEditMode = false;
  }

  const onShowDetails = (event) => {
    page = DETAILS_PAGE;
    pageData.id = event.detail;
  }
</script>

<main>
  {#if page === OVERVIEW_PAGE}
    {#if isInEditMode}
      <EditMeetup id={editedId} on:cancel={onCancelEvent} on:save={onSaveEvent} />
    {/if}
    <MeetupGrid
      meetups={$meetupStore}
      on:add={onAddEvent}
      on:edit={onEditEvent}
      on:show-details={onShowDetails} />
  {:else if page === DETAILS_PAGE}
    <MeetupDetail id={pageData.id} on:close={onCloseEvent} />
  {:else}
    <p>Page "{page}" not implemented</p>
  {/if}
</main>
