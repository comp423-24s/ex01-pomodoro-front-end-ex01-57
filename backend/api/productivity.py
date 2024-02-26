"""Productivity API

Productivity routes are used to create, retrieve, and update Pomodoro timers."""

from fastapi import APIRouter, Depends
from typing import List
from ..models.pomodorotimer import PomodoroTimer
from ..services.productivity import ProductivityService
from pydantic import BaseModel

__authors__ = ["Ajay Gandecha"]
__copyright__ = "Copyright 2024"
__license__ = "MIT"

api = APIRouter(prefix="/api/productivity")
openapi_tags = {
    "name": "Productivity",
    "description": "Create, update, delete, and retrieve Pomodoro timers.",
}

# Creates a Pomodoro Class from BaseModel
class PomodoroBase(BaseModel):
    id: int
    name: str
    description: str
    timer_length: int
    break_length: int


# TODO: Implement the following API:
# GET /api/productivity
# Gets all pomodoro timers.
# Expected return type: list[PomodoroTimer]
@api.get("/api/productivity/")
async def gettimers(
    productivity_service: ProductivityService = Depends(),
) -> list[PomodoroTimer]:
    timers = productivity_service.get_timers()
    return timers


# TODO: Implement the following API:
# GET /api/productivity/{id}
# Get a pomodoro timer by its ID.
# Expected return type: PomodoroTimer
@api.get("/api/productivity/{id}")
async def gettimer(
    id: int, productivity_service: ProductivityService = Depends()
) -> PomodoroTimer:
    timer = productivity_service.get_timer(id)
    return timer


# TODO: Implement the following API:
# POST /api/productivity/
# Creates a new pomodoro timer.
# Note: This API will take in a request body. What type should this be?
# Expected return type: PomodoroTimer
@api.post("/api/productivity/")
async def createtimer(
    pomodoro_data: PomodoroBase, productivity_service: ProductivityService = Depends()
) -> PomodoroTimer:
    new_timer = PomodoroTimer(
        id=pomodoro_data.id,
        name=pomodoro_data.name,
        description=pomodoro_data.description,
        timer_length=pomodoro_data.timer_length,
        break_length=pomodoro_data.break_length,
    )

    created_timer = productivity_service.create_timer(new_timer)
    return created_timer


# TODO: Implement the following API:
# PUT /api/productivity
# Updates a pomodoro timer.
# Note: This API will take in a request body. What type should this be?
# Expected return type: PomodoroTimer
@api.put("/api/productivity")
async def updatetimer(
    pomodoro_base: PomodoroBase, productivity_service: ProductivityService = Depends()
) -> PomodoroTimer:

    # Create object with new updated values
    UpdatedTimer = PomodoroTimer(
        id=pomodoro_base.id,
        name=pomodoro_base.name,
        description=pomodoro_base.description,
        timer_length=pomodoro_base.timer_length,
        break_length=pomodoro_base.break_length,
    )

    NewTimer = productivity_service.update_timer(UpdatedTimer)
    return NewTimer


# TODO: Implement the following API:
# DELETE /api/productivity/{id}
# Deletes a pomodoro timer.
# Expected return type: PomodoroTimer
